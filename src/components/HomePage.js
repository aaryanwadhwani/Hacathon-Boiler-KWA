// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';

// function HomePage() {
//   return (
//     <div className="container mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to the AI-Powered ATS Resume Reviewer </h1>
//       <p className="text-gray-700 leading-relaxed mb-8">
//         Optimize your resume and land your dream job with our advanced AI-driven tools. Get instant feedback, improve your ATS score, and discover job matches tailored to your skills.
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-blue-100 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
//           <h2 className="text-xl font-semibold text-blue-700 mb-3">Resume Analysis</h2>
//           <p className="text-gray-600">Upload your resume and get a detailed analysis of its ATS compatibility, keyword optimization, and overall effectiveness.</p>
//           <Link to="/resume-analysis" className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800">
//             Get Started
//             <ArrowRight className="ml-2" size={16} />
//           </Link>
//         </div>
//         <div className="bg-green-100 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
//           <h2 className="text-xl font-semibold text-green-700 mb-3">Job Matching</h2>
//           <p className="text-gray-600">Find the perfect job opportunities that match your skills and experience. Our AI algorithms analyze your resume and recommend relevant job postings.</p>
//           <Link to="/job-matching" className="inline-flex items-center mt-4 text-green-600 hover:text-green-800">
//             Find Jobs
//             <ArrowRight className="ml-2" size={16} />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;


// teri mkc

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';

// function HomePage() {
//   return (
//     <div className="min-h-screen bg-black py-12">
//       <div className="container mx-auto px-8">
//         {/* Main Heading */}
//         <h1 className="text-3xl font-bold mb-6" style={{ color: '#daaa00' }}>
//           Welcome to the AI-Powered ATS Resume Reviewer
//         </h1>

//         {/* Subtext */}
//         <p className="leading-relaxed mb-8" style={{ color: '#ddb945' }}>
//           Optimize your resume and land your dream job with our advanced AI-driven tools.
//           Get instant feedback, improve your ATS score, and discover job matches
//           tailored to your skills.
//         </p>

//         {/* Centered Card Container */}
//         <div className="flex justify-center">
//           {/* Resume Analysis Card */}
//           <div
//             className="p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
//             style={{ backgroundColor: '#6f727b' }}  // Medium gray background
//           >
//             <h2 className="text-xl font-semibold mb-3" style={{ color: '#ddb945' }}>
//               Resume Analysis
//             </h2>
//             <p style={{ color: '#EDE0SF' }}>
//               Upload your resume and get a detailed analysis of its ATS compatibility,
//               keyword optimization, and overall effectiveness.
//             </p>
//             <Link
//               to="/resume-analysis"
//               className="inline-flex items-center mt-4 transition-colors"
//               style={{ color: '#ddb945' }}
//             >
//               Get Started
//               <ArrowRight className="ml-2" size={16} />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;



import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import boilerTrain from './train.png';

function HomePage() {
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-8">
        {/* Main Heading */}
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#daaa00' }}>
          Welcome to the AI-Powered ATS Resume Reviewer
        </h1>

        {/* Subtext */}
        <p className="leading-relaxed mb-8" style={{ color: '#ddb945' }}>
          Optimize your resume and land your dream job with our advanced AI-driven tools.
          Get instant feedback, improve your ATS score, and discover job matches
          tailored to your skills.
        </p>

        {/* Centered Card Container */}
        <div className="flex justify-center">
          {/* Resume Analysis Card */}
          <div
            className="p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            style={{ backgroundColor: '#6f727b' }}
          >
            <h2 className="text-xl font-semibold mb-3" style={{ color: '#ddb945' }}>
              Resume Analysis
            </h2>
            <p style={{ color: '#EDE0SF' }}>
              Upload your resume and get a detailed analysis of its ATS compatibility,
              keyword optimization, and overall effectiveness.
            </p>
            <Link
              to="/resume-analysis"
              className="inline-flex items-center mt-4 transition-colors"
              style={{ color: '#ddb945' }}
            >
              Get Started
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>

        {/* 2) Image below the card, centered */}
        <div className="flex justify-center mt-8">
          <img
            src={boilerTrain}
            alt="Purdue Boilermaker Train"
            className="max-w-full h-auto"
            style={{ maxHeight: '350px' }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

