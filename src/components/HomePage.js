import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 pt-24 pb-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-5xl text-center">

        {/* Main Heading */}
        <h1 className="text-5xl font-extrabold text-black mb-6">
          Unlock Your Career with <span className="text-green-700">Alignify</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-800 mb-10 max-w-3xl mx-auto">
          Transform your resume into a powerful career asset. Our AI-powered ATS Resume Reviewer 
          delivers personalized, real-time feedback that optimizes your resume for both ATS and recruiters. 
          Whether you're just starting out or advancing in your career, Alignify helps you stand out.
        </p>

        {/* Card Container */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full">

          {/* Resume Analysis Card */}
          <div className="p-8 flex-1 min-h-[300px] bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl text-center transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Optimize Your Resume</h2>
            <p className="text-gray-800 mb-6">
              Upload your resume and let AI fine-tune it for job success. Our system enhances keyword strategies, 
              checks formatting, and evaluates ATS compatibility to improve your chances of landing interviews.
            </p>
            <Link 
              to="/resume-analysis" 
              className="inline-block px-6 py-3 bg-green-700 text-white font-semibold rounded-lg transition-all hover:bg-green-800 hover:shadow-lg">
              Get Started <ArrowRight className="inline ml-2" size={16} />
            </Link>
          </div>

          {/* Dashboard Access Card */}
          <div className="p-8 flex-1 min-h-[300px] bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl text-center transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Track & Improve</h2>
            <p className="text-gray-800 mb-6">
              Access your dashboard to track resume scans, receive tailored suggestions, and make adjustments. 
              Use AI-driven insights to refine your applications and boost your hiring chances.
            </p>
            <Link 
              to="/dashboard" 
              className="inline-block px-6 py-3 bg-green-700 text-white font-semibold rounded-lg transition-all hover:bg-green-800 hover:shadow-lg">
              Go to Dashboard <ArrowRight className="inline ml-2" size={16} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
