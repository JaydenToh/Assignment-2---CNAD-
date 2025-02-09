const mysql = require('mysql2/promise');

async function testConnection() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',       // Use localhost if MySQL is running locally
    user: 'root',            // Replace with your MySQL username
    password: '19V299332n02', // Replace with your MySQL password
    database: 'notification', // Replace with your database name
    port: 3306,              // Default MySQL port
  });
  console.log('Connected to MySQL!');
  await connection.end();
}

testConnection().catch((err) => console.error('Connection failed:', err));
