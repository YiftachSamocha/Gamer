import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the index.html file for all other routes
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
