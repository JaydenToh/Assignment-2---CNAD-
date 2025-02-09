// main.go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"cloud.google.com/go/firestore" // Firestore package
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"

	// Google Cloud Translation client
	"cloud.google.com/go/translate"
	// Google Cloud Text-to-Speech API client
	texttospeech "google.golang.org/api/texttospeech/v1"

	// For converting string to language.Tag
	"golang.org/x/text/language"

	// For loading environment variables from a .env file
	"github.com/joho/godotenv"
)

var (
	firebaseApp     *firebase.App
	translateClient *translate.Client
	ttsService      *texttospeech.Service
)

// defaultRiskThreshold is used to determine DVT risk (weighted score).
const defaultRiskThreshold = 4

// expectedAPIKey is read from the environment variable or set to a default.
var expectedAPIKey = func() string {
	if key := os.Getenv("API_KEY"); key != "" {
		return key
	}
	return "secret_assignment_key"
}()

// setCommonHeaders sets basic security and CORS headers.
func setCommonHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*") // Adjust for production!
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Content-Type-Options", "nosniff")
}

// requireAPIKey checks for a valid API key in the request headers.
func requireAPIKey(w http.ResponseWriter, r *http.Request) bool {
	apiKey := r.Header.Get("X-API-Key")
	if apiKey != expectedAPIKey {
		http.Error(w, "Forbidden: invalid API key", http.StatusForbidden)
		return false
	}
	return true
}

// initFirebase initializes the Firebase Admin SDK.
func initFirebase() error {
	ctx := context.Background()
	// Replace with the path to your Firebase service account key JSON file.
	opt := option.WithCredentialsFile("./serviceAccountKey.json")
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return fmt.Errorf("error initializing Firebase app: %v", err)
	}
	firebaseApp = app
	return nil
}

// initTranslateClient initializes the Google Cloud Translation client.
func initTranslateClient() error {
	ctx := context.Background()
	client, err := translate.NewClient(ctx, option.WithCredentialsFile("./googleCredentials.json"))
	if err != nil {
		return fmt.Errorf("failed to create Translate client: %v", err)
	}
	translateClient = client
	return nil
}

// initTTSService initializes the Google Cloud Text-to-Speech service.
func initTTSService() error {
	ctx := context.Background()
	service, err := texttospeech.NewService(ctx, option.WithCredentialsFile("./googleCredentials.json"))
	if err != nil {
		return fmt.Errorf("failed to create Text-to-Speech service: %v", err)
	}
	ttsService = service
	return nil
}

// getCollectionName returns the Firestore collection name based on the selected language.
func getCollectionName(lang string) string {
	switch lang {
	case "en-US":
		return "English"
	case "ms-MY":
		return "Malay"
	case "zh-CN":
		return "Chinese"
	case "ta-IN":
		return "Tamil"
	default:
		return "English"
	}
}

// questionsHandler retrieves the questions from Firestore.
func questionsHandler(w http.ResponseWriter, r *http.Request) {
	setCommonHeaders(w)
	if !requireAPIKey(w, r) {
		return
	}

	lang := r.URL.Query().Get("lang")
	if lang == "" {
		http.Error(w, "Missing language parameter", http.StatusBadRequest)
		return
	}
	collectionName := getCollectionName(lang)
	ctx := context.Background()

	// Initialize Firestore client from the Firebase app.
	client, err := firebaseApp.Firestore(ctx)
	if err != nil {
		http.Error(w, "Failed to connect to Firestore", http.StatusInternalServerError)
		log.Printf("Firestore connection error: %v", err)
		return
	}
	defer client.Close()

	// Query the specified collection, ordering by "question_id" (assumed numeric).
	iter := client.Collection(collectionName).OrderBy("question_id", firestore.Asc).Documents(ctx)
	docs, err := iter.GetAll()
	if err != nil {
		http.Error(w, "Failed to retrieve questions", http.StatusInternalServerError)
		log.Printf("Error retrieving questions: %v", err)
		return
	}

	var questions []map[string]interface{}
	for _, doc := range docs {
		questions = append(questions, doc.Data())
	}

	// Ensure that there are at least 20 questions.
	if len(questions) < 20 {
		http.Error(w, "Not enough questions in the database", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(questions)
}

// --- The following endpoints (translation, TTS, and assessment submission) remain largely the same ---

// Translate API structures and handler.
type TranslateRequest struct {
	Text       string `json:"text"`
	TargetLang string `json:"target_lang"` // e.g., "ms", "en-US", etc.
}

type TranslateResponse struct {
	TranslatedText string `json:"translated_text"`
}

func translateHandler(w http.ResponseWriter, r *http.Request) {
	setCommonHeaders(w)
	if !requireAPIKey(w, r) {
		return
	}
	ctx := context.Background()
	var req TranslateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON in request", http.StatusBadRequest)
		return
	}
	targetTag := language.Make(req.TargetLang)
	translations, err := translateClient.Translate(ctx, []string{req.Text}, targetTag, nil)
	if err != nil || len(translations) == 0 {
		http.Error(w, "Translation error", http.StatusInternalServerError)
		log.Printf("Translation error: %v", err)
		return
	}
	resp := TranslateResponse{TranslatedText: translations[0].Text}
	json.NewEncoder(w).Encode(resp)
}

// TTS API structures and handler.
type TTSRequest struct {
	Text         string `json:"text"`
	LanguageCode string `json:"language_code"` // e.g., "en-US", "ms-MY", etc.
}

type TTSResponse struct {
	AudioContent string `json:"audio_content"` // Base64 encoded MP3 audio
}

func ttsHandler(w http.ResponseWriter, r *http.Request) {
	setCommonHeaders(w)
	if !requireAPIKey(w, r) {
		return
	}
	ctx := context.Background()
	var req TTSRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON in request", http.StatusBadRequest)
		return
	}
	ttsRequest := &texttospeech.SynthesizeSpeechRequest{
		Input: &texttospeech.SynthesisInput{Text: req.Text},
		Voice: &texttospeech.VoiceSelectionParams{
			LanguageCode: req.LanguageCode,
			SsmlGender:   "FEMALE",
		},
		AudioConfig: &texttospeech.AudioConfig{AudioEncoding: "MP3"},
	}
	resp, err := ttsService.Text.Synthesize(ttsRequest).Context(ctx).Do()
	if err != nil {
		http.Error(w, fmt.Sprintf("TTS error: %v", err), http.StatusInternalServerError)
		log.Printf("TTS error: %v", err)
		return
	}
	ttsResp := TTSResponse{AudioContent: resp.AudioContent}
	json.NewEncoder(w).Encode(ttsResp)
}

// Assessment submission structures and handler.
type AssessmentResult struct {
	UserID      string    `json:"user_id"`
	Score       int       `json:"score"`
	Answers     []string  `json:"answers"`
	RiskStatus  string    `json:"risk_status"`
	SubmittedAt time.Time `json:"submitted_at"`
}

func alertAuthorities(result AssessmentResult) {
	log.Printf("ALERT: User (%s) is at risk for DVT. Score: %d. Authorities alerted.", result.UserID, result.Score)
}

func submitAssessmentHandler(w http.ResponseWriter, r *http.Request) {
	setCommonHeaders(w)
	if !requireAPIKey(w, r) {
		return
	}
	ctx := context.Background()
	var result AssessmentResult
	if err := json.NewDecoder(r.Body).Decode(&result); err != nil {
		http.Error(w, "Invalid JSON in request", http.StatusBadRequest)
		return
	}
	result.SubmittedAt = time.Now()

	// Ensure all 20 questions are answered.
	if len(result.Answers) < 20 {
		http.Error(w, "All questions must be answered", http.StatusBadRequest)
		return
	}

	// Define weights for each question (assumed keys "q1" through "q20").
	questionWeights := map[string]int{
		"q1":  1, "q2": 1, "q3": 1, "q4": 1, "q5": 1,
		"q6":  1, "q7": 3, "q8": 1, "q9": 1, "q10": 1,
		"q11": 1, "q12": 1, "q13": 1, "q14": 1, "q15": 1,
		"q16": 1, "q17": 1, "q18": 1, "q19": 1, "q20": 1,
	}
	score := 0
	for _, answer := range result.Answers {
		parts := strings.Split(answer, ":")
		if len(parts) != 2 {
			continue
		}
		qID := strings.TrimSpace(parts[0])
		resp := strings.TrimSpace(parts[1])
		// Here we assume that a "yes" (or an answer containing "option" for MCQ) is a positive response.
		if strings.EqualFold(resp, "yes") || strings.Contains(strings.ToLower(resp), "option") {
			if weight, ok := questionWeights[qID]; ok {
				score += weight
			}
		}
	}
	result.Score = score
	if score >= defaultRiskThreshold {
		result.RiskStatus = "at risk"
		alertAuthorities(result)
	} else {
		result.RiskStatus = "not at risk"
	}

	// Connect to Firestore to store the assessment.
	client, err := firebaseApp.Firestore(ctx)
	if err != nil {
		http.Error(w, "Failed to connect to Firestore", http.StatusInternalServerError)
		log.Printf("Firestore connection error: %v", err)
		return
	}
	defer client.Close()

	_, _, err = client.Collection("assessments").Add(ctx, result)
	if err != nil {
		http.Error(w, "Failed to save assessment", http.StatusInternalServerError)
		log.Printf("Firestore add error: %v", err)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":      "success",
		"risk_status": result.RiskStatus,
	})
}

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, relying on system environment variables")
	}
}

func main() {
	if err := initFirebase(); err != nil {
		log.Fatalf("Firebase initialization error: %v", err)
	}
	if err := initTranslateClient(); err != nil {
		log.Fatalf("Translate client initialization error: %v", err)
	}
	if err := initTTSService(); err != nil {
		log.Fatalf("TTS service initialization error: %v", err)
	}

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)
	http.HandleFunc("/api/questions", questionsHandler)
	http.HandleFunc("/api/translate", translateHandler)
	http.HandleFunc("/api/tts", ttsHandler)
	http.HandleFunc("/api/submit", submitAssessmentHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server started at http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
