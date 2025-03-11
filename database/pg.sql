CREATE DATABASE mareadata;

CREATE TABLE franchises(
    id SERIAL PRIMARY KEY,
    dirName VARCHAR(40),
    displayName VARCHAR(120)
);

CREATE TABLE entries_exits (
    id SERIAL PRIMARY KEY,
    franchise_id INT NOT NULL,
    date DATE NOT NULL,
    hour INT NOT NULL,
    entries INT NOT NULL,
    exits INT NOT NULL,
    CONSTRAINT fk_franchise FOREIGN KEY (franchise_id) REFERENCES franchises(id)
);