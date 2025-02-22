import React from 'react';

const AnalysisResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Resume Analysis</h2>

      {/* ATS Score */}
      <div className="mb-3">
        <span className="font-semibold text-gray-700">ATS Score:</span>{' '}
        <span className="text-gray-900">{result.atsScore || 'N/A'}</span>
      </div>

      {/* Missing Keywords */}
      <div className="mb-3">
        <span className="font-semibold text-gray-700">Missing Keywords:</span>
        {result.missingKeywords && result.missingKeywords.length > 0 ? (
          <ul className="list-disc list-inside mt-2 text-gray-900">
            {result.missingKeywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-900 ml-2">None</p>
        )}
      </div>

      {/* Suggestions */}
      <div className="mb-3">
        <span className="font-semibold text-gray-700">Suggestions:</span>
        <p className="mt-2 text-gray-900 whitespace-pre-line">
          {result.suggestions || 'No suggestions provided.'}
        </p>
      </div>
    </div>
  );
};

export default AnalysisResultCard;
