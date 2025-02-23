
// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// function ResumeAnalysisPage() {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [jobDescription, setJobDescription] = useState('');
//   const [analysisResult, setAnalysisResult] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setResumeFile(file);
//   };

//   const handleAnalysis = async () => {
//     if (!resumeFile) {
//       setError('Please upload a resume file.');
//       return;
//     }
//     if (!jobDescription) {
//       setError('Please enter a job description.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // Prepare FormData with the file and job description
//       const formData = new FormData();
//       formData.append('resumeFile', resumeFile);
//       formData.append('jobDescription', jobDescription);

//       // Send FormData to the backend
//       const res = await fetch('http://localhost:4000/chat', {
//         method: 'POST',
//         body: formData
//       });

//       if (!res.ok) {
//         throw new Error(`Server responded with status ${res.status}`);
//       }

//       const data = await res.json();
//       setAnalysisResult(data.response);
//     } catch (err) {
//       console.error("Error fetching response:", err);
//       setError("Error fetching response.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-6">
//         Resume Analysis 📝
//       </h1>
      
//       {/* Resume File Upload */}
//       <div className="mb-4">
//         <label
//           htmlFor="resumeUpload"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Upload Resume:
//         </label>
//         <input
//           type="file"
//           id="resumeUpload"
//           onChange={handleFileChange}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
      
//       {/* Job Description Input */}
//       <div className="mb-4">
//         <label
//           htmlFor="jobDescription"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Job Description:
//         </label>
//         <textarea
//           id="jobDescription"
//           rows="4"
//           placeholder="Enter the job description..."
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
      
//       <button
//         onClick={handleAnalysis}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         disabled={isLoading}
//       >
//         {isLoading ? 'Analyzing...' : 'Analyze Resume'}
//       </button>
      
//       {error && (
//         <div className="mt-4 text-red-500">
//           <X className="inline-block mr-1" size={16} />
//           {error}
//         </div>
//       )}
      
//       {analysisResult && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">
//             Analysis Result:
//           </h2>
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <pre className="text-gray-600 whitespace-pre-wrap">
//               {typeof analysisResult === 'object'
//                 ? JSON.stringify(analysisResult, null, 2)
//                 : analysisResult}
//             </pre>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResumeAnalysisPage;

// // src/components/ResumeAnalysisPage.js
// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import AnalysisResultCard from './AnalysisResultCard';

// function ResumeAnalysisPage() {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [jobDescription, setJobDescription] = useState('');
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileChange = (event) => {
//     setResumeFile(event.target.files[0]);
//   };

//   const handleAnalysis = async () => {
//     if (!resumeFile) {
//       setError('Please upload a resume file.');
//       return;
//     }
//     if (!jobDescription) {
//       setError('Please enter a job description.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append('resumeFile', resumeFile);
//       formData.append('jobDescription', jobDescription);

//       const res = await fetch('http://localhost:4000/chat', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error(`Server responded with status ${res.status}`);
//       }

//       const data = await res.json();
//       setAnalysisResult(data.response);
//     } catch (err) {
//       console.error("Error fetching response:", err);
//       setError("Error fetching response.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-12 p-8 bg-gray-50">
//       <h1 className="text-3xl font-semibold text-gray-800 mb-6">Resume Analysis 📝</h1>

//       {/* Resume File Upload */}
//       <div className="mb-4">
//         <label htmlFor="resumeUpload" className="block text-gray-700 text-sm font-bold mb-2">
//           Upload Resume:
//         </label>
//         <input
//           type="file"
//           id="resumeUpload"
//           onChange={handleFileChange}
//           className="shadow appearance-none border rounded w-full py-2 px-3"
//         />
//       </div>

//       {/* Job Description Input */}
//       <div className="mb-4">
//         <label htmlFor="jobDescription" className="block text-gray-700 text-sm font-bold mb-2">
//           Job Description:
//         </label>
//         <textarea
//           id="jobDescription"
//           rows="4"
//           placeholder="Enter the job description..."
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3"
//         />
//       </div>

//       <button
//         onClick={handleAnalysis}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
//         disabled={isLoading}
//       >
//         {isLoading ? 'Analyzing...' : 'Analyze Resume'}
//       </button>

//       {error && (
//         <div className="mt-4 text-red-500 flex items-center">
//           <X className="mr-1" size={16} /> {error}
//         </div>
//       )}

//       {analysisResult && (
//         <div className="mt-8">
//           <AnalysisResultCard result={analysisResult} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResumeAnalysisPage;

//testttttttttt


// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import AnalysisResultCard from './AnalysisResultCard';

// function ResumeAnalysisPage() {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [jobDescription, setJobDescription] = useState('');
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileChange = (event) => {
//     setResumeFile(event.target.files[0]);
//   };

//   const handleAnalysis = async () => {
//     if (!resumeFile) {
//       setError('Please upload a resume file.');
//       return;
//     }
//     if (!jobDescription) {
//       setError('Please enter a job description.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append('resumeFile', resumeFile);
//       formData.append('jobDescription', jobDescription);

//       const res = await fetch('http://localhost:4000/chat', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error(`Server responded with status ${res.status}`);
//       }

//       const data = await res.json();
//       setAnalysisResult(data.response);
//     } catch (err) {
//       console.error("Error fetching response:", err);
//       setError("Error fetching response.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black py-12">
//       <div className="container mx-auto px-8">
//         <h1 className="text-3xl font-semibold mb-6" style={{ color: '#daaa00' }}>
//           Resume Analysis
//         </h1>

//         {/* Resume File Upload */}
//         <div className="mb-4">
//           <label
//             htmlFor="resumeUpload"
//             className="block text-sm font-bold mb-2"
//             style={{ color: '#ddb945' }}
//           >
//             Upload Resume:
//           </label>
//           <input
//             type="file"
//             id="resumeUpload"
//             onChange={handleFileChange}
//             className="w-full py-2 px-3 rounded border border-[#ddb945]"
//             style={{
//               backgroundColor: '#6f727b',
//               color: '#ddb945',
//             }}
//           />
//         </div>

//         {/* Job Description Input */}
//         <div className="mb-4">
//           <label
//             htmlFor="jobDescription"
//             className="block text-sm font-bold mb-2"
//             style={{ color: '#ddb945' }}
//           >
//             Job Description:
//           </label>
//           <textarea
//             id="jobDescription"
//             rows="4"
//             placeholder="Enter the job description..."
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//             className="w-full py-2 px-3 rounded border border-[#ddb945]"
//             style={{
//               backgroundColor: '#6f727b',
//               color: '#000000',
//             }}
//           />
//         </div>

//         <button
//           onClick={handleAnalysis}
//           disabled={isLoading}
//           className="font-bold py-2 px-4 rounded"
//           style={{
//             backgroundColor: isLoading ? '#6f727b' : '#ddb945',
//             color: '#000000',
//           }}
//         >
//           {isLoading ? 'Analyzing...' : 'Analyze Resume'}
//         </button>

//         {error && (
//           <div className="mt-4 flex items-center" style={{ color: '#DAA520' }}>
//             <X className="mr-1" size={16} /> {error}
//           </div>
//         )}

//         {analysisResult && (
//           <div className="mt-8">
//             <AnalysisResultCard result={analysisResult} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ResumeAnalysisPage;

// src/components/ResumeAnalysisPage.js
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
  
  // Get the authenticated user's info from Auth0
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
      // Build FormData and include the userId from Auth0
      const formData = new FormData();
      formData.append('resumeFile', resumeFile);
      formData.append('jobDescription', jobDescription);
      formData.append('userId', user.sub); // This is the unique user identifier

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
    <div className="container mx-auto mt-12 p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Resume Analysis 📝</h1>

      {/* Resume File Upload */}
      <div className="mb-4">
        <label htmlFor="resumeUpload" className="block text-gray-700 text-sm font-bold mb-2">
          Upload Resume:
        </label>
        <input
          type="file"
          id="resumeUpload"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />
      </div>

      {/* Job Description Input */}
      <div className="mb-4">
        <label htmlFor="jobDescription" className="block text-gray-700 text-sm font-bold mb-2">
          Job Description:
        </label>
        <textarea
          id="jobDescription"
          rows="4"
          placeholder="Enter the job description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />
      </div>

      <button
        onClick={handleAnalysis}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {error && (
        <div className="mt-4 text-red-500 flex items-center">
          <X className="mr-1" size={16} /> {error}
        </div>
      )}

      {analysisResult && (
        <div className="mt-8">
          <AnalysisResultCard result={analysisResult} />
        </div>
      )}
    </div>
  );
}

export default ResumeAnalysisPage;
