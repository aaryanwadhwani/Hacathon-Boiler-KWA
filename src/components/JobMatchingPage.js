// import React, { useState } from 'react';
// import { Search } from 'lucide-react';

// function JobMatchingPage() {
//   const [jobMatches, setJobMatches] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     setIsLoading(true);
//     setError(null);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       setJobMatches([
//         {
//           id: 1,
//           title: 'Software Engineer',
//           company: 'Google',
//           location: 'Mountain View, CA',
//         },
//         {
//           id: 2,
//           title: 'Data Scientist',
//           company: 'Amazon',
//           location: 'Seattle, WA',
//         },
//       ]);
//     }, 2000);
//   };

//   return (
//     <div className="container mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-6">Job Matching 💼</h1>
//       <button
//         onClick={handleSearch}
//         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         disabled={isLoading}
//       >
//         {isLoading ? 'Searching...' : 'Find Job Matches'}
//       </button>
//       {error && (
//         <div className="mt-4 text-red-500">
//           {error}
//         </div>
//       )}
//       {jobMatches.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Job Matches:</h2>
//           <ul>
//             {jobMatches.map((job) => (
//               <li key={job.id} className="bg-gray-100 p-4 rounded-lg mb-2">
//                 <p className="text-gray-600"><strong>{job.title}</strong></p>
//                 <p className="text-gray-600">{job.company}, {job.location}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default JobMatchingPage;

import { useState } from 'react';

const JobMatchingPage = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  const queryLlama = async () => {
    try {
      const res = await fetch('http://localhost:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: inputText })
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-8">
        <h1 className="text-3xl font-semibold mb-6" style={{ color: '#CFB991' }}>
          Job Matching 💼
        </h1>

        <textarea
          className="w-full border rounded p-2"
          rows="4"
          placeholder="Enter your query..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            backgroundColor: '#6F6F6F',
            color: '#EDE0SF',
            borderColor: '#CFB991',
          }}
        />

        <button
          className="mt-2 font-bold py-2 px-4 rounded"
          onClick={queryLlama}
          style={{
            backgroundColor: '#CFB991',
            color: '#000000',
          }}
        >
          Ask Llama
        </button>

        {response && (
          <div
            className="mt-4 p-4 rounded border"
            style={{
              backgroundColor: '#6F6F6F',
              borderColor: '#CFB991',
              color: '#EDE0SF',
            }}
          >
            <strong style={{ color: '#CDB98F' }}>Response:</strong>
            <p className="mt-2">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMatchingPage;
