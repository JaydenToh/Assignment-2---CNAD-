CREATE TABLE reaction_tests (
    id SERIAL PRIMARY KEY,
    test_1 INT NOT NULL,
    test_2 INT NOT NULL,
    test_3 INT NOT NULL,
    total_time INT NOT NULL,
    result_category VARCHAR(50) NOT NULL,
    test_date TIMESTAMP DEFAULT NOW()
);