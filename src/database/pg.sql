CREATE DATABASE mareadata;

CREATE TABLE
    franchises (
        id SERIAL PRIMARY KEY,
        dirName VARCHAR(40),
        displayName VARCHAR(120)
    );

CREATE TABLE
    entries_exits (
        id SERIAL PRIMARY KEY,
        franchise_id INT NOT NULL,
        date DATE NOT NULL,
        hour INT NOT NULL,
        entries INT NOT NULL,
        exits INT NOT NULL,
        CONSTRAINT fk_franchise FOREIGN KEY (franchise_id) REFERENCES franchises (id)
    );

-- TEST
INSERT INTO
    franchises (dirname, displayname)
VALUES
    ('test', 'Nuevo Test');

SELECT
    *
FROM
    franchises;

SELECT
    f.displayName,
    ee.date,
    ee.hour,
    ee.entries,
    ee.exits
FROM
    entries_exits as ee
    LEFT JOIN franchises as f ON f.id = ee.franchise_id;


SELECT
    f.displayName,
    ee.date,
    ee.hour,
    ee.entries,
    ee.exits
FROM
    entries_exits as ee
    LEFT JOIN franchises as f ON f.id = ee.franchise_id
WHERE
    ee.date BETWEEN '2024-12-25' AND '2024-12-25';


SELECT
    f.displayName,
    ee.date,
    ee.hour,
    ee.entries,
    ee.exits
FROM
    entries_exits as ee
    LEFT JOIN franchises as f ON f.id = ee.franchise_id
WHERE
    ee.date BETWEEN '2024-12-25' AND '2024-12-25'
AND
    ee.franchise_id = '1';