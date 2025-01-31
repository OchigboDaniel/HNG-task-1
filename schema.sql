CREATE TABLE books (
    id VARCHAR(4) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    publication_date DATE DEFAULT CURRENT_DATE,
    availability_status BOOLEAN DEFAULT TRUE
);