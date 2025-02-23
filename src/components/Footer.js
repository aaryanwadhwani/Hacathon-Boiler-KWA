import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-center p-4">
      <p className="text-sm" style={{ color: '#ddb945' }}>
        © {new Date().getFullYear()} ATS Resume Reviewer. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
