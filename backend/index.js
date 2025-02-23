// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // API Route to communicate with Ollama running locally
// app.post('/query', async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         if (!prompt) {
//             return res.status(400).json({ error: "Prompt is required" });
//         }

//         // Sending request to locally running Ollama server
//         const response = await axios.post(
//             'http://localhost:11434/api/generate',
//             {
//                 model: 'llama3', // Make sure the model is correctly loaded in Ollama
//                 prompt: prompt,
//                 options: { temperature: 0.7 }
//             }
//         );

//         // Sending response back to frontend
//         res.json({ response: response.data.response });
//     } catch (error) {
//         console.error("Error querying Ollama:", error.message);
//         res.status(500).json({ error: error.message });
//     }
// });

// // Start Express server
// const PORT = process.env.PORT || 4999;
// app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

// index.js (Backend)

//test 1

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // New endpoint to handle resume analysis via ChatGPT API
// app.post('/chat', async (req, res) => {
//     try {
//       const { resumeText, jobDescription } = req.body;
//       if (!resumeText || !jobDescription) {
//         return res.status(400).json({ error: "Both resumeText and jobDescription are required." });
//       }
  
//       const prompt = `Please analyze the following resume for ATS compatibility in the context of the provided job description.
      
//   Resume:
//   ${resumeText}
  
//   Job Description:
//   ${jobDescription}
  
//   Return the analysis as a JSON object with the following keys:
//   - finalScore: overall resume score (0-100)
//   - atsScore: ATS compatibility score (0-100)
//   - missingKeywords: an array of keywords missing from the resume that are important for the job
//   - suggestions: textual suggestions for improvement.`;
  
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-4o-mini",
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//           },
//         }
//       );
  
//       const result = response.data.choices[0].message.content;
//       let parsedResult;
//       try {
//         parsedResult = JSON.parse(result);
//       } catch (error) {
//         parsedResult = result;
//       }
  
//       res.json({ response: parsedResult });
//     } catch (error) {
//       // Log more details if available
//       console.error(
//         "Error querying ChatGPT:",
//         error.response ? error.response.data : error.message
//       );
//       res.status(500).json({ error: error.message });
//     }
//   });
  

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));


//test 232

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();

// // Enable CORS for requests from http://localhost:3000
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());

// // Endpoint to handle resume analysis via ChatGPT API
// app.post('/chat', async (req, res) => {
//     try {
//       const { resumeText, jobDescription } = req.body;
//       if (!resumeText || !jobDescription) {
//         return res.status(400).json({ error: "Both resumeText and jobDescription are required." });
//       }
  
//       const prompt = `Please analyze the following resume for ATS compatibility in the context of the provided job description.
      
// Resume:
// ${resumeText}
      
// Job Description:
// ${jobDescription}
      
// Return the analysis as a JSON object with the following keys:
// - finalScore: overall resume score (0-100)
// - atsScore: ATS compatibility score (0-100)
// - missingKeywords: an array of keywords missing from the resume that are important for the job
// - suggestions: textual suggestions for improvement.`;
  
//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-4o-mini",
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//           },
//         }
//       );
  
//       const result = response.data.choices[0].message.content;
//       let parsedResult;
//       try {
//         parsedResult = JSON.parse(result);
//       } catch (error) {
//         parsedResult = result;
//       }
  
//       res.json({ response: parsedResult });
//     } catch (error) {
//       console.error(
//         "Error querying ChatGPT:",
//         error.response ? error.response.data : error.message
//       );
//       res.status(500).json({ error: error.message });
//     }
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));


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
  suggestions: { type: String },
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

// POST /chat endpoint: process resume file and job description, call ChatGPT API, and store analysis in MongoDB
// app.post('/chat', upload.single('resumeFile'), async (req, res) => {
//   try {
//     const jobDescription = req.body.jobDescription;
//     const resumeFile = req.file;

//     if (!resumeFile || !jobDescription) {
//       return res.status(400).json({ error: "Resume file and job description are required." });
//     }

//     let resumeText = '';

//     // If the file is a PDF, parse its text; otherwise, treat as UTF-8 text.
//     if (resumeFile.mimetype === 'application/pdf') {
//       const pdfData = await pdfParse(resumeFile.buffer);
//       resumeText = pdfData.text;
//     } else {
//       resumeText = resumeFile.buffer.toString('utf-8');
//     }

//     // Build a prompt using the resume text and job description.
//     const prompt = `Please analyze the following resume for ATS compatibility in the context of the provided job description.
    
// Resume:
// ${resumeText}
    
// Job Description:
// ${jobDescription}
    
// Return the analysis as a JSON object with the following keys:
// - atsScore: ATS compatibility score (0-100)
// - missingKeywords: an array of keywords missing from the resume that are important for the job
// - suggestions: textual suggestions for improvement.`;

//     // Call the ChatGPT API (using your chosen model, e.g. "gpt-4o-mini" or "gpt-4")
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );

//     const rawResult = response.data.choices[0].message.content;
//     let parsedResult;
//     try {
//       parsedResult = JSON.parse(rawResult);
//     } catch (error) {
//       parsedResult = extractJSON(rawResult);
//       if (!parsedResult) {
//         parsedResult = { atsScore: null, missingKeywords: [], suggestions: rawResult };
//       }
//     }

//     // Save the analysis (along with the resume text and job description) into MongoDB
//     const analysisDoc = new Analysis({
//       resumeText,
//       jobDescription,
//       atsScore: parsedResult.atsScore,
//       missingKeywords: parsedResult.missingKeywords,
//       suggestions: parsedResult.suggestions,
//     });
//     await analysisDoc.save();

//     // Return the analysis result to the frontend
//     res.json({ response: parsedResult });
//   } catch (error) {
//     console.error(
//       "Error querying ChatGPT:",
//       error.response ? error.response.data : error.message
//     );
//     res.status(500).json({ error: error.message });
//   }
// });

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

    const prompt = `Please analyze the following resume for ATS compatibility in the context of the provided job description.
    
Resume:
${resumeText}
    
Job Description:
${jobDescription}
    
Return the analysis as a JSON object with the following keys:
- atsScore: ATS compatibility score (0-100)
- missingKeywords: an array of keywords missing from the resume that are important for the job
- suggestions: textual suggestions for improvement.`;

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


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
