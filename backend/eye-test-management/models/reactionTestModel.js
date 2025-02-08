const supabase = require("../dbConfig");

// ✅ Insert a new reaction test result
const insertReactionTest = async (test_1, test_2, test_3) => {
    const totalTime = test_1 + test_2 + test_3;
    let category = "Good";
    if (totalTime >= 20000) category = "High Risk";
    else if (totalTime >= 15000) category = "Okay";

    const { data, error } = await supabase
        .from("reaction_tests")
        .insert([{ test_1, test_2, test_3, total_time: totalTime, result_category: category }]);

    if (error) throw new Error(error.message);
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
