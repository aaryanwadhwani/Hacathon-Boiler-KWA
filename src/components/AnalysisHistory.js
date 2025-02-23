import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { X } from 'lucide-react';

const getResumeStrength = (score) => {
  if (score >= 80) return { label: 'Strong', color: 'bg-green-500' };
  if (score >= 50) return { label: 'Moderate', color: 'bg-yellow-400' };
  return { label: 'Weak', color: 'bg-red-500' };
};

// Dynamically highlight missing keywords in the suggestions
const highlightKeywords = (text, missingKeywords) => {
  if (!missingKeywords || missingKeywords.length === 0) return text;

  const regex = new RegExp(`\\b(${missingKeywords.join('|')})\\b`, 'gi');
  return text.replace(regex, (match) => `<span class="font-bold text-green-600">${match}</span>`);
};

function AnalysisHistory() {
  const [analyses, setAnalyses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth0();
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    async function fetchAnalyses() {
      setIsLoading(true);
      try {
        const userId = encodeURIComponent(user.sub);
        const res = await fetch(`http://localhost:4000/analyses?userId=${userId}`);
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        const data = await res.json();

        const formattedData = data.analyses.map(analysis => ({
          ...analysis,
          missingKeywords: Array.isArray(analysis.missingKeywords) ? analysis.missingKeywords : [],
          suggestions: analysis.suggestions || "No suggestions provided."
        }));

        setAnalyses(formattedData);
      } catch (err) {
        console.error(err);
        setError('Error fetching analyses.');
      } finally {
        setIsLoading(false);
      }
    }
    if (user) {
      fetchAnalyses();
    }
  }, [user]);

  // Dynamically adjust card size based on number of items
  const gridColumns = analyses.length <= 10 ? "grid-cols-3" 
                  : analyses.length <= 15 ? "grid-cols-4"
                  : analyses.length <= 20 ? "grid-cols-5" 
                  : "grid-cols-6";

  return (
    <div className="container mx-auto mt-12 p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold text-green-800 mb-6 text-center">My Resume Analyses</h1>

      {isLoading && <p className="text-center text-gray-600">Loading analyses...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && analyses.length === 0 && <p className="text-center text-gray-600">No analyses found.</p>}

      {/* Responsive Grid for Dynamic Sizing */}
      <div className={`grid ${gridColumns} gap-4`}>
        {analyses.map((analysis) => (
          <div 
            key={analysis._id} 
            className="bg-white shadow-md rounded-xl p-4 text-center cursor-pointer transition-transform transform hover:scale-110 hover:shadow-lg"
            onClick={() => setExpandedCard(analysis)}
          >
            <p className="text-lg font-bold text-green-700">ATS: {analysis.atsScore}</p>
            <p className="text-sm text-gray-600">
              {analysis.missingKeywords.length > 0 
                ? `Missing: ${analysis.missingKeywords.slice(0, 2).join(', ')}...`
                : "No missing keywords"}
            </p>
          </div>
        ))}
      </div>

      {/* Expanded View */}
      {expandedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
          
          {/* Close Button */}
          <button 
            className="absolute top-8 right-8 bg-white rounded-full p-3 shadow-lg text-gray-700 hover:text-red-600 transition-all"
            onClick={() => setExpandedCard(null)}
          >
            <X size={32} />
          </button>

          {/* The Expanding Card */}
          <div className="bg-white w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-lg border border-green-400">
            
            <h2 className="text-2xl font-bold text-green-700 mb-4">Resume Analysis</h2>

            {/* ATS Score */}
            <div className="mb-4">
              <span className="font-semibold text-green-800">ATS Score:</span>{' '}
              <span className="text-black">{expandedCard.atsScore || 'N/A'}</span>

              <div className="relative w-full h-4 bg-gray-200 rounded-full mt-2">
                <div className={`absolute top-0 left-0 h-4 rounded-full ${getResumeStrength(expandedCard.atsScore).color}`} 
                    style={{ width: `${expandedCard.atsScore || 0}%` }}>
                </div>
              </div>
              
              <p className={`mt-2 text-sm font-semibold ${getResumeStrength(expandedCard.atsScore).color} text-center text-white rounded-lg px-2 py-1 inline-block`}>
                {getResumeStrength(expandedCard.atsScore).label}
              </p>
            </div>

            {/* Missing Keywords */}
            <div className="mb-4">
              <span className="font-semibold text-green-800">Missing Keywords:</span>
              {expandedCard.missingKeywords.length > 0 ? (
                <ul className="list-disc list-outside pl-5 mt-2 text-black space-y-1">
                  {expandedCard.missingKeywords.map((keyword, index) => (
                    <li key={index} className="leading-relaxed">{keyword}</li>
                  ))}
                </ul>
              ) : (
                <p className="ml-2 text-black">None</p>
              )}
            </div>

            {/* Suggestions */}
            <div>
              <span className="font-semibold text-green-800">Suggestions:</span>
              <ul className="list-decimal list-outside pl-5 mt-2 text-black space-y-2">
                {Array.isArray(expandedCard.suggestions) ? (
                  expandedCard.suggestions.map((sentence, index) => (
                    <li key={index} className="leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: highlightKeywords(sentence.trim(), expandedCard.missingKeywords) }}>
                    </li>
                  ))
                ) : (
                  <li className="leading-relaxed">
                    {expandedCard.suggestions 
                      ? <span dangerouslySetInnerHTML={{ __html: highlightKeywords(String(expandedCard.suggestions), expandedCard.missingKeywords) }} />
                      : "No suggestions provided."}
                  </li>
                )}
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default AnalysisHistory;
