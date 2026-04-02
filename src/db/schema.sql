CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    salary NUMERIC NOT NULL,
    jobTitle TEXT NOT NULL,
    country TEXT NOT NULL
);