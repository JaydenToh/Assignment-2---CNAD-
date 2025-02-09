const { insertReactionTest, getAllReactionTests, getReactionTestById } = require("../models/reactionTestModel");

// ✅ Controller to insert a reaction test result
const createReactionTest = async (req, res) => {
    try {
        console.log("📥 Received Data:", req.body);  // ✅ Log request data
        const { test_1, test_2, test_3 } = req.body;
        if (test_1 == null || test_2 == null || test_3 == null) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const data = await insertReactionTest(test_1, test_2, test_3);
        res.status(201).json({ message: "Reaction test saved", data });
    } catch (error) {
        console.error("❌ Error Saving Data:", error.message);
        res.status(500).json({ message: error.message });
    }
};


// ✅ Controller to fetch all reaction test results
const fetchAllReactionTests = async (req, res) => {
    try {
        const data = await getAllReactionTests();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Controller to fetch a reaction test by ID
const fetchReactionTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getReactionTestById(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReactionTest, fetchAllReactionTests, fetchReactionTestById };
