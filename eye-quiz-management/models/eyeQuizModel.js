const supabase = require("../dbConfig");

// ✅ Insert a new eye quiz result
const insertEyeQuizResult = async (answers) => {
    const { data, error } = await supabase
        .from("eye_quiz_results")
        .insert([answers]);

    if (error) throw new Error(error.message);
    return data;
};

// ✅ Get all eye quiz results
const getAllEyeQuizResults = async () => {
    const { data, error } = await supabase.from("eye_quiz_results").select("*");

    if (error) throw new Error(error.message);
    return data;
};

// ✅ Get a single eye quiz result by ID
const getEyeQuizResultById = async (id) => {
    const { data, error } = await supabase
        .from("eye_quiz_results")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

module.exports = { insertEyeQuizResult, getAllEyeQuizResults, getEyeQuizResultById };
