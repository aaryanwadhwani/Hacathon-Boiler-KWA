import React from 'react';

const AnalysisResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="shadow-2xl rounded-3xl p-8 border border-green-400 transition-transform transform hover:scale-105 duration-300"
      style={{ backgroundColor: '#ffffff', color: '#333' }}>
      
      <h2 className="text-2xl font-bold text-green-700 mb-4">Resume Analysis</h2>

      {/* ATS Score */}
      <div className="mb-4">
        <span className="font-semibold text-green-800">ATS Score:</span>{' '}
        <span className="text-black">{result.atsScore || 'N/A'}</span>
      </div>

      {/* Missing Keywords */}
      <div className="mb-4">
        <span className="font-semibold text-green-800">Missing Keywords:</span>
        {result.missingKeywords && result.missingKeywords.length > 0 ? (
          <ul className="list-disc list-outside pl-5 mt-2 text-black space-y-1">
            {result.missingKeywords.map((keyword, index) => (
              <li key={index} className="leading-relaxed">{keyword}</li>
            ))}
          </ul>
        ) : (
          <p className="ml-2 text-black">None</p>
        )}
      </div>

      {/* Suggestions - Fixing the Issue */}
      <div>
        <span className="font-semibold text-green-800">Suggestions:</span>
        <ul className="list-disc list-outside pl-5 mt-2 text-black space-y-2">
          {Array.isArray(result.suggestions) ? (
            result.suggestions.map((suggestion, index) => (
              <li key={index} className="leading-relaxed">{suggestion}</li>
            ))
          ) : (
            <li className="leading-relaxed">{result.suggestions}</li> // If suggestions is still a string, display it
          )}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResultCard;
