import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function HomePage() {
  return (
    <div className="container mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to the AI-Powered ATS Resume Reviewer 🚀</h1>
      <p className="text-gray-700 leading-relaxed mb-8">
        Optimize your resume and land your dream job with our advanced AI-driven tools. Get instant feedback, improve your ATS score, and discover job matches tailored to your skills.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">Resume Analysis</h2>
          <p className="text-gray-600">Upload your resume and get a detailed analysis of its ATS compatibility, keyword optimization, and overall effectiveness.</p>
          <Link to="/resume-analysis" className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800">
            Get Started
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
        <div className="bg-green-100 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-green-700 mb-3">Job Matching</h2>
          <p className="text-gray-600">Find the perfect job opportunities that match your skills and experience. Our AI algorithms analyze your resume and recommend relevant job postings.</p>
          <Link to="/job-matching" className="inline-flex items-center mt-4 text-green-600 hover:text-green-800">
            Find Jobs
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
