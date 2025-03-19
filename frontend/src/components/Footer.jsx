import React from 'react';

function Footer() {
  return (
    <div className="bg-gray-100 py-8 text-center">
      <footer>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Stay Connected</h4>
          <p className="text-gray-600 mb-4">Join us on social media for the latest job updates and career tips!</p>
          <div className="flex justify-center space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
                alt="Facebook"
              />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/fluent/30/000000/twitter.png"
                alt="Twitter"
              />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/fluent/30/000000/linkedin.png"
                alt="LinkedIn"
              />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
                alt="Instagram"
              />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/fluent/30/000000/youtube-play.png"
                alt="YouTube"
              />
            </a>
          </div>
        </div>

        <div className="mt-8 space-x-4 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600">About Us</a> | 
          <a href="#" className="hover:text-blue-600">Contact Us</a> | 
          <a href="#" className="hover:text-blue-600">Privacy Policy</a> | 
          <a href="#" className="hover:text-blue-600">Terms of Service</a> | 
          <a href="#" className="hover:text-blue-600">Help Center</a>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <p>Contact: support@dreamhire.com | +91 9135916393</p>
          <p>© {new Date().getFullYear()} DreamHire. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
