require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mongoose = require('mongoose');

const app = express();

// Enable CORS for requests from your frontend (http://localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use multer for handling multipart/form-data (file uploads)
const upload = multer();

// Connect to MongoDB with Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a schema and model for storing resume analysis results
const AnalysisSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User ID from Auth0 (e.g., user.sub)
  resumeText: { type: String, required: true },
  jobDescription: { type: String, required: true },
  atsScore: { type: Number },
  missingKeywords: { type: [String] },
  suggestions: { type: [String] },
  createdAt: { type: Date, default: Date.now }
});

const Analysis = mongoose.model('Analysis', AnalysisSchema);

// Helper function: Attempt to extract JSON substring from a string
function extractJSON(str) {
  const firstBrace = str.indexOf('{');
  const lastBrace = str.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    const jsonString = str.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(jsonString);
    } catch (err) {
      return null;
    }
  }
  return null;
}

// POST /chat endpoint
app.post('/chat', upload.single('resumeFile'), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;
    const userId = req.body.userId; // Get the user ID from the request
    const resumeFile = req.file;

    if (!resumeFile || !jobDescription || !userId) {
      return res.status(400).json({ error: "Resume file, job description, and userId are required." });
    }

    let resumeText = '';
    if (resumeFile.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(resumeFile.buffer);
      resumeText = pdfData.text;
    } else {
      resumeText = resumeFile.buffer.toString('utf-8');
    }

    const prompt = `I want you to act as an expert talent acquisition recruiter for a top multinational company. Analyze the following resume in the context of the given job description. Identify specific keywords, skills, or concepts that are missing or underrepresented in the resume and that are critical for passing ATS screening. For each identified gap, provide targeted suggestions for modifying specific lines or sections of the resume rather than just giving generic advice.

    Return your analysis as a JSON object with the following keys:
    - atsScore: a number between 0 and 100 representing the ATS compatibility score.
    - missingKeywords: a flat array of strings. Each string should be a single keyword or short phrase that is missing from the resume. If no keywords are missing, return an array with a string that states "No keywords missing."
    - suggestions: an array of strings. Each string should be a detailed suggestion for improvement in bullet point format. Ensure each suggestion specifies exactly which line or section to modify (for example, "Edit the second bullet under 'TAMRON Experience' to include the phrase 'quant analysis'") and what to add or change. Provide as many specific suggestions as possible.
    
    Resume:
    ${resumeText}
    
    Job Description:
    ${jobDescription}`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // or "gpt-4" if available
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const rawResult = response.data.choices[0].message.content;
    let parsedResult;
    try {
      parsedResult = JSON.parse(rawResult);
    } catch (error) {
      parsedResult = extractJSON(rawResult);
      if (!parsedResult) {
        parsedResult = { atsScore: null, missingKeywords: [], suggestions: rawResult };
      }
    }

    // Save the analysis along with the userId
    const analysisDoc = new Analysis({
      userId,
      resumeText,
      jobDescription,
      atsScore: parsedResult.atsScore,
      missingKeywords: parsedResult.missingKeywords,
      suggestions: parsedResult.suggestions,
    });
    await analysisDoc.save();

    res.json({ response: parsedResult });
  } catch (error) {
    console.error(
      "Error querying ChatGPT:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: error.message });
  }
});

// GET /analyses endpoint: Returns analyses for a given userId passed as a query parameter
app.get('/analyses', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "userId is required." });
    }
    const analyses = await Analysis.find({ userId }).sort({ createdAt: -1 });
    res.json({ analyses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
