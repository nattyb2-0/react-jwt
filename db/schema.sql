DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(70) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(20) NOT NULL,
  createDate TIMESTAMP,
  accessedDate TIMESTAMP
);
