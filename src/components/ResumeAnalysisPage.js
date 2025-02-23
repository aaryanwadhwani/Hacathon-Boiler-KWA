import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import AnalysisResultCard from './AnalysisResultCard';

function ResumeAnalysisPage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth0();

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleAnalysis = async () => {
    if (!resumeFile) {
      setError('Please upload a resume file.');
      return;
    }
    if (!jobDescription) {
      setError('Please enter a job description.');
      return;
    }
    if (!user || !user.sub) {
      setError('User information not available.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('resumeFile', resumeFile);
      formData.append('jobDescription', jobDescription);
      formData.append('userId', user.sub);

      const res = await fetch('http://localhost:4000/chat', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      setAnalysisResult(data.response);
    } catch (err) {
      console.error("Error fetching response:", err);
      setError("Error fetching response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16"
      style={{ background: 'linear-gradient(to bottom, #f5fff5, #d5f5e3)' }}>

      {/* Title - More Space Below Navbar */}
      <h1 className="text-4xl font-extrabold text-green-700 mb-14">Resume Analysis</h1>

      {/* Upload Section */}
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl p-10 rounded-3xl w-3/4 max-w-3xl transition-transform transform hover:scale-105 duration-300">
        
        <div className="mb-6">
          <label className="block font-bold text-lg text-green-800">Upload Resume:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 mt-2 rounded-lg border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label className="block font-bold text-lg text-green-800">Job Description:</label>
          <textarea
            rows="4"
            placeholder="Enter the job description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full px-3 py-2 mt-2 rounded-lg border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalysis}
          className="w-full px-5 py-3 bg-green-700 text-white font-semibold rounded-lg transition-all hover:bg-green-800 hover:shadow-lg text-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Resume'}
        </button>

        {error && (
          <div className="mt-4 text-red-500 flex items-center">
            <X className="mr-2" size={18} /> {error}
          </div>
        )}
      </div>

      {/* Analysis Result Card */}
      {analysisResult && (
        <div className="mt-10 w-3/4 max-w-3xl">
          <AnalysisResultCard result={analysisResult} />
        </div>
      )}
    </div>
  );
}

export default ResumeAnalysisPage;
