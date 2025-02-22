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

const app = express();

// Enable CORS for requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configure multer to handle file uploads in memory
const upload = multer();

function extractJSON(str) {
  // Find first and last curly brace
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

// Endpoint to handle resume analysis via ChatGPT API
app.post('/chat', upload.single('resumeFile'), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;
    const resumeFile = req.file;

    if (!resumeFile || !jobDescription) {
      return res
        .status(400)
        .json({ error: "Resume file and jobDescription are required." });
    }

    let resumeText = '';

    // If the file is a PDF, parse text with pdf-parse
    if (resumeFile.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(resumeFile.buffer);
      resumeText = pdfData.text;
    } else {
      // Fallback: treat file as plain text (UTF-8)
      resumeText = resumeFile.buffer.toString('utf-8');
    }

    // Build the prompt
    const prompt = `Please analyze the following resume for ATS compatibility in the context of the provided job description.
    
Resume:
${resumeText}
    
Job Description:
${jobDescription}
    
Return the analysis as a JSON object with the following keys:
- atsScore: ATS compatibility score (0-100)
- missingKeywords: an array of keywords missing from the resume that are important for the job
- suggestions: textual suggestions for improvement.`;

    // Call the ChatGPT API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // or "gpt-4" if you have access
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
      // Try a direct parse
      parsedResult = JSON.parse(rawResult);
    } catch (error) {
      // If that fails, try to extract JSON substring
      parsedResult = extractJSON(rawResult);
      if (!parsedResult) {
        // If extraction fails, return the raw result
        parsedResult = { atsScore: 'N/A', missingKeywords: [], suggestions: rawResult };
      }
    }

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
