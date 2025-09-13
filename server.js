const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint để xử lý chatbot
app.post('/chatbot', (req, res) => {
    const { message, context } = req.body;
    const apiKey = "AIzaSyCVEzm4DaJcsWDyKjWnlOVzd69wQKXCJNI"; // Nên lưu trong biến môi trường

    // Gọi Python script để xử lý
    const pythonProcess = spawn('python', [path.join(__dirname, 'process_text.py'), message, JSON.stringify(context), apiKey]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            res.json({ response: result.trim() });
        } else {
            res.status(500).json({ error: 'Error processing request' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
