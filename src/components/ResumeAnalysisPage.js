import React, { useState } from 'react';
import { Upload, Check, X } from 'lucide-react';

function ResumeAnalysisPage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setResumeFile(file);
  };

  const handleAnalysis = async () => {
    if (!resumeFile) {
      setError('Please upload a resume file.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setAnalysisResult({
        atsScore: 75,
        missingKeywords: ['Leadership', 'Teamwork', 'Communication'],
        suggestions: 'Improve your summary section and quantify your achievements.',
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Resume Analysis 📝</h1>
      <div className="mb-4">
        <label htmlFor="resumeUpload" className="block text-gray-700 text-sm font-bold mb-2">
          Upload Resume:
        </label>
        <input
          type="file"
          id="resumeUpload"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleAnalysis}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
      {error && (
        <div className="mt-4 text-red-500">
          <X className="inline-block mr-1" size={16} />
          {error}
        </div>
      )}
      {analysisResult && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Analysis Result:</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600"><strong>ATS Score:</strong> {analysisResult.atsScore}</p>
            <p className="text-gray-600"><strong>Missing Keywords:</strong> {analysisResult.missingKeywords.join(', ')}</p>
            <p className="text-gray-600"><strong>Suggestions:</strong> {analysisResult.suggestions}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalysisPage;
