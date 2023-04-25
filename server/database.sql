-- USE THE FOLLOWING COMMANDS TO CREATE A DATABASE
-- creating a database

CREATE DATABASE todo_app;

-- \c into todo_app

-- creating a table for the users
-- download an extension for uu and add it to the database
-- RUN THE COMMAND BELOW TO INSTALL EXTENSION TO ALLOW UUID
-- create extension if not exists "uuid-ossp";
CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

-- creating a table for the tasks
CREATE TABLE task (
  task_id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(user_id),
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  status VARCHAR(20) DEFAULT 'open' NOT NULL,
  favorite BOOLEAN DEFAULT false NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);