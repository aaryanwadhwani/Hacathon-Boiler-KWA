
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
         Unlock Your Career with Alignify
        </h1>

        {/* Subtext */}
        <p className="leading-relaxed mb-8" style={{ color: '#ddb945' }}>
        Transform your resume into your most powerful career asset. Our AI-powered ATS Resume Reviewer delivers personalized, 
        real-time feedback that not only boosts your ATS score but also fine-tunes your resume for human recruiters. 
        Whether you're just starting out or looking to climb the career ladder, Alignify is your partner in achieving your dream job.
        </p>

        {/* Centered Card Container */}
        <div className="flex justify-center">
          {/* Resume Analysis Card */}
          <div
            className="p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            style={{ backgroundColor: '#6f727b' }}
          >
            <h2 className="text-xl font-semibold mb-3" style={{ color: '#ddb945' }}>
            Alignify Your Resume
            </h2>
            <p style={{ color: '#EDE0SF' }}>
            Upload your resume and let Alignify's intelligent AI unlock its full potential. Our system performs a deep dive into 
            your document, evaluating ATS compatibility, refining keyword strategies, and assessing overall impact. Get clear, 
            actionable insights that help you stand out in every job application.
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

