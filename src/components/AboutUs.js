import React from 'react';

function AboutUs() {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      
      {/* Header Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-green-800">Alignify</h1>
        <p className="text-lg text-gray-700 mt-2">
            Trusted by 3 Purdue students!
        </p>
      </div>

      {/* Story Section */}
      <div className="container mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800">Our Story</h2>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Alignify was born from a simple yet frustrating problem: talented job seekers were getting 
          rejected by <strong>Applicant Tracking Systems (ATS)</strong> before their resumes ever reached a recruiter. 
          Our founders realized that the job market 
          wasn’t just about <strong>who was most qualified</strong>—it was also about <strong>who could make it past AI filters</strong>.
        </p>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Determined to <strong>bridge this gap</strong>, we developed Alignify—an AI-driven resume optimization 
          platform that <strong>empowers candidates</strong> by tailoring their resumes for <strong>maximum visibility</strong> 
          in applicant tracking systems. Today, we help thousands of users <strong>boost their ATS scores, 
          enhance keyword relevance, and land more interviews</strong> with ease.
        </p>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800">Our Mission</h2>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          At <span className="font-bold text-green-600">Alignify</span>, we believe that <strong>every job seeker 
          deserves a fair chance</strong>. Our mission is to <strong>eliminate resume blind spots</strong>, optimize job 
          applications using AI, and <strong>help candidates stand out</strong>—not just to <strong>ATS algorithms</strong>, 
          but also to <strong>real hiring managers</strong>.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12 container mx-auto px-6 pb-24">
        
        {/* AI-Powered ATS Scanning */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-green-400">
          <h3 className="text-xl font-semibold text-green-700">AI-Powered ATS Scanning</h3>
          <p className="text-gray-700 mt-2">
            We use cutting-edge <strong>AI & NLP</strong> to analyze your resume, match it against 
            job descriptions, and highlight missing keywords to improve your ATS score.
          </p>
        </div>

        {/* Data-Driven Resume Optimization */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-green-400">
          <h3 className="text-xl font-semibold text-green-700">Data-Driven Resume Optimization</h3>
          <p className="text-gray-700 mt-2">
            Get <strong>real-time feedback</strong> to refine your resume and <strong>increase your chances 
            of landing interviews</strong>.
          </p>
        </div>

        {/* Tailored Keyword Suggestions */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-green-400">
          <h3 className="text-xl font-semibold text-green-700">Tailored Keyword Suggestions</h3>
          <p className="text-gray-700 mt-2">
            We identify <strong>missing industry-specific keywords</strong> and suggest improvements 
            to <strong>align your resume with job postings</strong>.
          </p>
        </div>

        {/* Seamless User Experience */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-green-400">
          <h3 className="text-xl font-semibold text-green-700">Seamless User Experience</h3>
          <p className="text-gray-700 mt-2">
            Enjoy an <strong>intuitive and user-friendly interface</strong> with real-time feedback, 
            easy uploads, and <strong>detailed ATS reports</strong> to track improvements.
          </p>
        </div>

      </div>

    </div>
  );
}

export default AboutUs;
