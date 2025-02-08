//db config
module.exports = {
  user: process.env.DB_USER, // Replace with your SQL Server login username
  password: process.env.DB_PASS, // Replace with your SQL Server login password
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  trustServerCertificate: true,
  options: {
    port: 1433, // Default SQL Server port
    connectionTimeout: 60000, // Connection timeout in milliseconds
  },
};
