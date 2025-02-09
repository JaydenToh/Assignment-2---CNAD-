const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

console.log("Connecting to Supabase:", process.env.SUPABASE_URL);  

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

module.exports = supabase;
