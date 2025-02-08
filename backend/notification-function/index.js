const express = require('express');
const app = express();
const db = require('./db');

app.get('/admins', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Admin');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = 3000; // Ensure this matches the port in your Docker Compose
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
