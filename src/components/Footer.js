import React from 'react';

function Footer() {
  return (
    <footer className="text-center p-4" style={{ backgroundColor: '#58d68d' }}>
      <p className="text-xs font-semibold text-black">
        © {new Date().getFullYear()} ATS Resume Reviewer. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
