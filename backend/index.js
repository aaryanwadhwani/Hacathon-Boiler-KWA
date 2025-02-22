require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

// API Route to communicate with Ollama running locally
app.post('/query', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Sending request to locally running Ollama server
        const response = await axios.post(
            'http://localhost:11434/api/generate',
            {
                model: 'llama3', // Make sure the model is correctly loaded in Ollama
                prompt: prompt,
                options: { temperature: 0.7 }
            }
        );

        // Sending response back to frontend
        res.json({ response: response.data.response });
    } catch (error) {
        console.error("Error querying Ollama:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Start Express server
const PORT = process.env.PORT || 4999;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
