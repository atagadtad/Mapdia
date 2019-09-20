-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users
CASCADE;
DROP TABLE IF EXISTS maps
CASCADE;
DROP TABLE IF EXISTS pins
CASCADE;
DROP TABLE IF EXISTS favorites
CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE maps
(
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  description TEXT
);

CREATE TABLE pins
(
  id SERIAL PRIMARY KEY NOT NULL,
  longitude INTEGER NOT NULL DEFAULT 0,
  latitude INTEGER NOT NULL DEFAULT 0,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);

CREATE TABLE favorites
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
