// src/components/AnalysisHistory.js
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function AnalysisHistory() {
  const [analyses, setAnalyses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth0();

  useEffect(() => {
    async function fetchAnalyses() {
      setIsLoading(true);
      try {
        // Pass the userId as a query parameter (encoded)
        const userId = encodeURIComponent(user.sub);
        const res = await fetch(`http://localhost:4000/analyses?userId=${userId}`);
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        const data = await res.json();
        setAnalyses(data.analyses);
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

  return (
    <div className="container mx-auto mt-12 p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Resume Analyses</h1>
      {isLoading && <p>Loading analyses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && analyses.length === 0 && <p>No analyses found.</p>}
      {analyses.length > 0 && (
        <ul className="space-y-4">
          {analyses.map((analysis) => (
            <li key={analysis._id} className="bg-white shadow p-4 rounded">
              <p className="mb-1"><strong>Job Description:</strong> {analysis.jobDescription}</p>
              <p className="mb-1"><strong>ATS Score:</strong> {analysis.atsScore}</p>
              <p className="mb-1">
                <strong>Missing Keywords:</strong>{' '}
                {analysis.missingKeywords && analysis.missingKeywords.length > 0
                  ? analysis.missingKeywords.join(', ')
                  : 'None'}
              </p>
              <p className="mb-1"><strong>Suggestions:</strong> {analysis.suggestions}</p>
              <p className="text-sm text-gray-500">
                Analyzed on: {new Date(analysis.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AnalysisHistory;
