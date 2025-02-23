import React from 'react';

const getResumeStrength = (score) => {
  if (score >= 80) return { label: 'Strong', color: 'bg-green-500' };
  if (score >= 50) return { label: 'Moderate', color: 'bg-yellow-400' };
  return { label: 'Weak', color: 'bg-red-500' };
};

// Dynamically highlight only the missing keywords
const highlightKeywords = (text, missingKeywords) => {
  if (!missingKeywords || missingKeywords.length === 0) return text;

  // Create a regex pattern based on the missing keywords
  const regex = new RegExp(`\\b(${missingKeywords.join('|')})\\b`, 'gi');
  
  return text.replace(regex, (match) => `<span class="font-bold text-green-600">${match}</span>`);
};

const AnalysisResultCard = ({ result }) => {
  if (!result) return null;

  const resumeStrength = getResumeStrength(result.atsScore || 0);
  const missingKeywords = result.missingKeywords || []; // Get missing keywords from result

  return (
    <div className="shadow-2xl rounded-3xl p-8 border border-green-400 transition-transform transform hover:scale-105 duration-300"
      style={{ backgroundColor: '#ffffff', color: '#333' }}>
      
      <h2 className="text-2xl font-bold text-green-700 mb-4">Resume Analysis</h2>

      {/* ATS Score with Progress Bar */}
      <div className="mb-4">
        <span className="font-semibold text-green-800">ATS Score:</span>{' '}
        <span className="text-black">{result.atsScore || 'N/A'}</span>

        <div className="relative w-full h-4 bg-gray-200 rounded-full mt-2">
          <div className={`absolute top-0 left-0 h-4 rounded-full ${resumeStrength.color}`} 
               style={{ width: `${result.atsScore || 0}%` }}>
          </div>
        </div>
        
        <p className={`mt-2 text-sm font-semibold ${resumeStrength.color} text-center text-white rounded-lg px-2 py-1 inline-block`}>
          {resumeStrength.label}
        </p>
      </div>

      {/* Missing Keywords */}
      <div className="mb-4">
        <span className="font-semibold text-green-800">Missing Keywords:</span>
        {missingKeywords.length > 0 ? (
          <ul className="list-disc list-outside pl-5 mt-2 text-black space-y-1">
            {missingKeywords.map((keyword, index) => (
              <li key={index} className="leading-relaxed">{keyword}</li>
            ))}
          </ul>
        ) : (
          <p className="ml-2 text-black">None</p>
        )}
      </div>

      {/* Suggestions with Keyword Highlighting */}
      <div>
        <span className="font-semibold text-green-800">Suggestions:</span>
        <ul className="list-decimal list-outside pl-5 mt-2 text-black space-y-2">
          {Array.isArray(result.suggestions) ? (
            result.suggestions.map((sentence, index) => (
              <li key={index} className="leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: highlightKeywords(sentence.trim(), missingKeywords) }}>
              </li>
            ))
          ) : (
            <li className="leading-relaxed">
              {result.suggestions 
                ? <span dangerouslySetInnerHTML={{ __html: highlightKeywords(String(result.suggestions), missingKeywords) }} />
                : "No suggestions provided."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResultCard;
