// server.js

import express from 'express';
import path from 'path'

const app = express();
const port = process.env.PORT || 3000;

// Middleware for serving static files
app.use(express.static('dist'));

// Simple route
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'))
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
