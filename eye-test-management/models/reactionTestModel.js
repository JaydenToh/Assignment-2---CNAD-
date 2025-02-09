const supabase = require("../dbConfig");

// ✅ Insert a new reaction test result
const insertReactionTest = async (test_1, test_2, test_3) => {
    // Convert seconds to milliseconds (integer values)
    const test_1_ms = Math.round(test_1 * 1000);
    const test_2_ms = Math.round(test_2 * 1000);
    const test_3_ms = Math.round(test_3 * 1000);
    const totalTime = test_1_ms + test_2_ms + test_3_ms; // Total time in milliseconds

    let category = "Low";
    if (totalTime > 2500) category = "High Risk";  // Adjusted to milliseconds
    else if (totalTime >= 1500) category = "Okay";

    console.log("📤 Inserting into DB:", { test_1_ms, test_2_ms, test_3_ms, totalTime, category });

    const { data, error } = await supabase
        .from("reaction_tests")
        .insert([{ 
            test_1: test_1_ms,
            test_2: test_2_ms, 
            test_3: test_3_ms, 
            total_time: totalTime, 
            result_category: category 
        }]);

    if (error) {
        console.error("❌ Supabase Insert Error:", error.message);
        throw new Error(error.message);
    }
    console.log("✅ Insert Success:", data);
    return data;
};




// ✅ Get all reaction test results
const getAllReactionTests = async () => {
    const { data, error } = await supabase.from("reaction_tests").select("*");

    if (error) throw new Error(error.message);
    return data;
};

// ✅ Get a single reaction test by ID
const getReactionTestById = async (id) => {
    const { data, error } = await supabase
        .from("reaction_tests")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

module.exports = { insertReactionTest, getAllReactionTests, getReactionTestById };
