const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const pdf = require('pdf-parse');
const fs = require('fs'); // For file system operations (if needed)

const app = express();
const port = process.env.PORT || 3001; // Choose a port

app.use(cors()); // Enable CORS for local development
app.use(bodyParser.json()); // Enable parsing JSON request bodies

// OpenAI Configuration (REPLACE with your actual key)
const configuration = new Configuration({
  apiKey: "YOUR_OPENAI_API_KEY", // Get this from OpenAI website
});
const openai = new OpenAIApi(configuration);


app.post('/upload', (req, res) => {
  // In a real app, you would handle file uploads properly.
  // For this simplified example, we'll assume the resume text is sent in the body.
  const resumeText = req.body.resumeText;

  if (!resumeText) {
      return res.status(400).json({ error: "No resume text provided." });
  }
  // Basic keyword matching (replace with your actual keywords)
  const jobDescriptionKeywords = ["software", "engineer", "javascript", "react"]; // Example
  let score = 0;
  jobDescriptionKeywords.forEach(keyword => {
    if (resumeText.toLowerCase().includes(keyword)) {
      score++;
    }
  });


  res.json({ atsScore: score });

});


app.post('/analyze', async (req, res) => {
  const resumeText = req.body.resumeText;
  const jobDescription = req.body.jobDescription;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "Resume and job description are required." });
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Or another suitable model
      prompt: `Rewrite the following resume section to be more tailored to this job description:\n\nResume Section:\n${resumeText}\n\nJob Description:\n${jobDescription}`,
      max_tokens: 200, // Adjust as needed
    });

    const rewrittenResume = response.data.choices[0].text.trim();
    res.json({ rewrittenResume });

  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Error communicating with OpenAI." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});