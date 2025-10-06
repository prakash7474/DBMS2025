-- Create database
CREATE DATABASE cemsdb;

-- Use database
\c cemsdb;

-- Departments table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Clubs table
CREATE TABLE clubs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  department_id INT REFERENCES departments(id)
);

-- Students table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100)
);

-- Club heads (ClubUser)
CREATE TABLE club_users (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  club_id INT REFERENCES clubs(id),
  role VARCHAR(50) DEFAULT 'head'
);

-- Memberships
CREATE TABLE memberships (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  club_id INT REFERENCES clubs(id),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Venues table
CREATE TABLE venues (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(255)
);

-- Event types
CREATE TABLE event_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  venue_id INT REFERENCES venues(id),
  event_type_id INT REFERENCES event_types(id),
  club_id INT REFERENCES clubs(id)
);

-- Registrations
CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  event_id INT REFERENCES events(id),
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certificates
CREATE TABLE certificates (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  event_id INT REFERENCES events(id),
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Announcements
CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  club_id INT REFERENCES clubs(id),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id),
  student_id INT REFERENCES students(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
