const { insertEyeQuizResult, getAllEyeQuizResults, getEyeQuizResultById } = require("../models/eyeQuizModel");

// ✅ Controller to insert an eye quiz result
const createEyeQuizResult = async (req, res) => {
    try {
        const {
            q1_blurry_vision, q2_small_text, q3_night_vision, q4_eye_rubbing, q5_eye_strain,
            q6_light_sensitivity, q7_tired_eyes, q8_headaches, q9_worsening_vision, q10_squinting,
            q11_boolean_1, q12_boolean_2, q13_boolean_3,
            simple_test_1, simple_test_2, simple_test_3
        } = req.body;

        // Ensure all required fields are provided
        if (
            [q1_blurry_vision, q2_small_text, q3_night_vision, q4_eye_rubbing, q5_eye_strain,
            q6_light_sensitivity, q7_tired_eyes, q8_headaches, q9_worsening_vision, q10_squinting]
            .some(value => value == null || value < 1 || value > 5) ||
            [q11_boolean_1, q12_boolean_2, q13_boolean_3, simple_test_1, simple_test_2, simple_test_3]
            .some(value => typeof value !== "boolean")
        ) {
            return res.status(400).json({ message: "Invalid data provided" });
        }

        // Calculate total score
        let totalScore =
            q1_blurry_vision + q2_small_text + q3_night_vision + q4_eye_rubbing + q5_eye_strain +
            q6_light_sensitivity + q7_tired_eyes + q8_headaches + q9_worsening_vision + q10_squinting;

        // Add penalty for incorrect boolean/math answers (if false, +1 penalty)
        if (!simple_test_1) totalScore += 1;
        if (!simple_test_2) totalScore += 1;
        if (!simple_test_3) totalScore += 1;

        // Determine risk category
        let riskCategory = "Safe";
        if (totalScore >= 30) riskCategory = "Risk";
        else if (totalScore >= 25) riskCategory = "Good";

        // Insert into database
        const data = await insertEyeQuizResult({
            q1_blurry_vision, q2_small_text, q3_night_vision, q4_eye_rubbing, q5_eye_strain,
            q6_light_sensitivity, q7_tired_eyes, q8_headaches, q9_worsening_vision, q10_squinting,
            q11_boolean_1, q12_boolean_2, q13_boolean_3,
            simple_test_1, simple_test_2, simple_test_3,
            total_score: totalScore,
            risk_category: riskCategory
        });

        res.status(201).json({ message: "Eye quiz result saved", data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Controller to fetch all eye quiz results
const fetchAllEyeQuizResults = async (req, res) => {
    try {
        const data = await getAllEyeQuizResults();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Controller to fetch an eye quiz result by ID
const fetchEyeQuizResultById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getEyeQuizResultById(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEyeQuizResult, fetchAllEyeQuizResults, fetchEyeQuizResultById };
