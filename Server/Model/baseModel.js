const db = require("./db");

// Create the query to create the 'users' table
const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (email)
)
`;

// Execute the query to create the 'users' table
db.query(createUserTableQuery, (err) => {
  if (err) {
    console.log("User model error");
    console.error('Error creating "users" table: ' + err.stack);
  } else {
    console.log('Table "users" created');
  }
});


// Crteate the query to create the 'discussions' table
const createChatTableQuery = `
CREATE TABLE IF NOT EXISTS discussions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  senderEmail VARCHAR(255) NOT NULL,
  receiverEmail VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (senderEmail) REFERENCES users(email),
  FOREIGN KEY (receiverEmail) REFERENCES users(email)
  )
`;
// Execute the query to create the 'discussions' table
db.query(createChatTableQuery, (err) => {
  if (err) {
    console.log("discussion model error");
    console.error('Error creating "discussion" table: ' + err.stack);
  } else {
    console.log('Table "discussion" created');
  }
});
module.exports = db;
