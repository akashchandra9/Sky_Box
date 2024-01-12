// auth.js
const bcrypt = require('bcrypt');
const db = require('./db');

async function signUp({ firstname, lastname, phone, email, username, password }) {
  try {
    const connection = await db.getConnection();
  
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await connection.query(
      'INSERT INTO users (firstName, lastName, phone, userName, email, password) VALUES (?, ?, ?, ?, ?, ?)',
      [firstname, lastname, phone, username, email, hashedPassword]
    );

    connection.release();

    console.log('Signup successful!');
    return { success: true, message: 'Signup successful!' };
  } catch (error) {
    console.error('Error:', error.message);
    return { success: false, error: 'Internal server error.' };
  }
}

async function login({ username, password }) {
  try {
    const connection = await db.getConnection();

    // Retrieve the user from the database
    const result = await connection.query('SELECT * FROM users WHERE userName = ?', [username]);
    const user = result[0][0];

    connection.release();

    if (!user) {
      return { success: false, error: 'Invalid credentials.' };
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      console.log('Login successful!');
      return { success: true, message: 'Login successful!' };
    } else {
      console.log('Invalid credentials.');
      return { success: false, error: 'Invalid credentials.' };
    }
  } catch (error) {
    console.error('Error:', error.message);
    return { success: false, error: 'Internal server error.' };
  }
}

module.exports = { signUp, login };
