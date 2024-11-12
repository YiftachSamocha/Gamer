// server.js

import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware for serving static files
app.use(express.static('dist'));

// Simple route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
