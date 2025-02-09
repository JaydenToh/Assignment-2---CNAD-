const supabase = require("../dbConfig");

// ✅ Insert a new reaction test result
const insertReactionTest = async (test_1, test_2, test_3) => {
    const totalTime = Math.round((test_1 + test_2 + test_3) * 1000); // Convert to ms integer

    let category = "Good";
    if (totalTime >= 20000) category = "High Risk";
    else if (totalTime >= 15000) category = "Okay";

    console.log("📤 Inserting into DB:", { test_1, test_2, test_3, totalTime, category });

    const { data, error } = await supabase
        .from("reaction_tests")
        .insert([{ 
            test_1: Math.round(test_1 * 1000), // Convert float to int (ms)
            test_2: Math.round(test_2 * 1000), 
            test_3: Math.round(test_3 * 1000), 
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
