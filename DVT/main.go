// main.go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
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

// Default thresholds
const (
	defaultRiskThreshold = 4 // DVT threshold
	fallingThreshold     = 3 // Falling risk threshold
)

// Hardcoded API key for this microservice.
var expectedAPIKey = "AIzaSyBruOTBaUluGiKITRCDXVIuoom8AlyaOow"

// handleCors sets the required CORS headers.  
// If the request method is OPTIONS, it writes a 200 OK and returns true.
func handleCors(w http.ResponseWriter, r *http.Request) bool {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-API-Key")
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return true
	}
	return false
}

// setCommonHeaders sets basic security and Content-Type headers.
func setCommonHeaders(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Content-Type-Options", "nosniff")
}

// requireAPIKey checks that the request has the correct API key.
func requireAPIKey(w http.ResponseWriter, r *http.Request) bool {
	apiKey := r.Header.Get("X-API-Key")
	if apiKey != expectedAPIKey {
		http.Error(w, "Forbidden: invalid API key", http.StatusForbidden)
		return false
	}
	return true
}

// initFirebase initializes Firebase using the service account key.
func initFirebase() error {
	ctx := context.Background()
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

// getCollectionName returns the Firestore collection name based on language.
func getCollectionName(lang string) string {
	switch lang {
	case "en-US":
		return "English"
	case "ms-MY":
		return "Malay"
	case "zh-CN":
		return "Chinese"
	default:
		return "English"
	}
}

// questionsHandler retrieves questions from Firestore.
func questionsHandler(w http.ResponseWriter, r *http.Request) {
	if handleCors(w, r) {
		return
	}
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
	client, err := firebaseApp.Firestore(ctx)
	if err != nil {
		http.Error(w, "Failed to connect to Firestore", http.StatusInternalServerError)
		log.Printf("Firestore connection error: %v", err)
		return
	}
	defer client.Close()

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

	if len(questions) < 20 {
		http.Error(w, "Not enough questions in the database", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(questions)
}

// Translate endpoint structures and handler.
type TranslateRequest struct {
	Text       string `json:"text"`
	TargetLang string `json:"target_lang"`
}

type TranslateResponse struct {
	TranslatedText string `json:"translated_text"`
}

func translateHandler(w http.ResponseWriter, r *http.Request) {
	if handleCors(w, r) {
		return
	}
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

// TTS endpoint structures and handler.
type TTSRequest struct {
	Text         string `json:"text"`
	LanguageCode string `json:"language_code"`
}

type TTSResponse struct {
	AudioContent string `json:"audio_content"`
}

func ttsHandler(w http.ResponseWriter, r *http.Request) {
	if handleCors(w, r) {
		return
	}
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
// Computes both DVT risk and falling risk and records a unique assessment ID.
type AssessmentResult struct {
	UserID            string    `json:"user_id"`
	ScoreDVT          int       `json:"score_dvt"`
	ScoreFalling      int       `json:"score_falling"`
	RiskStatusDVT     string    `json:"risk_status_dvt"`
	RiskStatusFalling string    `json:"risk_status_falling"`
	Answers           []string  `json:"answers"`
	SubmittedAt       time.Time `json:"submitted_at"`
	AssessmentID      string    `json:"assessment_id,omitempty"`
}

func alertAuthorities(result AssessmentResult) {
	log.Printf("ALERT: User (%s) is at high risk. DVT Score: %d, Falling Score: %d. Authorities alerted.",
		result.UserID, result.ScoreDVT, result.ScoreFalling)
}

func submitAssessmentHandler(w http.ResponseWriter, r *http.Request) {
	if handleCors(w, r) {
		return
	}
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

	if len(result.Answers) < 20 {
		http.Error(w, "All questions must be answered", http.StatusBadRequest)
		return
	}

	// Define weight maps.
	dvtWeights := map[int]int{
		1: 1, 2: 1, 3: 1, 4: 1, 5: 1,
		6: 1, 7: 3, 8: 1, 9: 1, 10: 1,
		11: 1, 12: 1, 13: 1, 14: 1, 15: 1,
		16: 1, 17: 1, 18: 1, 19: 1, 20: 1,
	}
	fallingWeights := map[int]int{
		5:  2, // Age over 60
		10: 1, // Sedentary lifestyle
		11: 1, // Smoking
	}

	dvtScore := 0
	fallingScore := 0

	for _, answer := range result.Answers {
		// Expected format: "q{number}: answer"
		parts := strings.Split(answer, ":")
		if len(parts) != 2 {
			continue
		}
		qStr := strings.TrimSpace(strings.TrimPrefix(parts[0], "q"))
		qID, err := strconv.Atoi(qStr)
		if err != nil {
			continue
		}
		resp := strings.TrimSpace(parts[1])
		// Check for a positive response.
		if strings.EqualFold(resp, "yes") || strings.Contains(strings.ToLower(resp), "option") {
			if weight, ok := dvtWeights[qID]; ok {
				dvtScore += weight
			}
			if weight, ok := fallingWeights[qID]; ok {
				fallingScore += weight
			}
		}
	}

	result.ScoreDVT = dvtScore
	result.ScoreFalling = fallingScore

	if dvtScore >= defaultRiskThreshold {
		result.RiskStatusDVT = "high risk for DVT"
	} else {
		result.RiskStatusDVT = "low risk for DVT"
	}

	if fallingScore >= fallingThreshold {
		result.RiskStatusFalling = "high risk for falling"
	} else {
		result.RiskStatusFalling = "low risk for falling"
	}

	// Call alertAuthorities if either risk is high.
	if dvtScore >= defaultRiskThreshold || fallingScore >= fallingThreshold {
		alertAuthorities(result)
	}

	client, err := firebaseApp.Firestore(ctx)
	if err != nil {
		http.Error(w, "Failed to connect to Firestore", http.StatusInternalServerError)
		log.Printf("Firestore connection error: %v", err)
		return
	}
	defer client.Close()

	docRef, _, err := client.Collection("assessments").Add(ctx, result)
	if err != nil {
		http.Error(w, "Failed to save assessment", http.StatusInternalServerError)
		log.Printf("Firestore add error: %v", err)
		return
	}
	result.AssessmentID = docRef.ID

	json.NewEncoder(w).Encode(result)
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

	// Hardcode port to 8080.
	port := "8080"
	log.Printf("Server started at http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
