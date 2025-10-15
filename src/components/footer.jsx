import React from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-black dark:bg-black/50 backdrop-blur-lg dark:text-white py-16 mt-12 border-t border-white/10"
      role="contentinfo"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
              Hacktoberfest
            </h3>
            <p className="text-gray-600 dark:text-indigo-200 mb-4">
              A month-long celebration of open source software run by
              DigitalOcean.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/topics/hacktoberfest"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Hacktoberfest on GitHub"
                className="text-black dark:text-white hover:text-pink-400 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black rounded"
              >
                <FaGithub size={24} />
              </a>

              <a
                href="https://x.com/hacktoberfest"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Hacktoberfest on Twitter"
                className="text-black dark:text-white hover:text-pink-400 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black rounded"
              >
                <FaTwitter size={24} />
              </a>

              <a
                href="https://www.linkedin.com/company/hacktoberfest/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Hacktoberfest on LinkedIn"
                className="text-black dark:text-white hover:text-pink-400 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black rounded"
              >
                <FaLinkedin size={24} />
              </a>

              <a
                href="https://www.facebook.com/hacktoberfest/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Hacktoberfest on Facebook"
                className="text-black dark:text-white hover:text-pink-400 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black rounded"
              >
                <FaFacebook size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Resources</h4>
            <ul className="space-y-2 text-gray-600 dark:text-indigo-200">
              <li>
                <a
                  href="https://hacktoberfest.com/participation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Getting Started with Hacktoberfest"
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/resources/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Hacktoberfest Documentation"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/faq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Hacktoberfest Frequently Asked Questions"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/community/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Hacktoberfest Community"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Participate
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-indigo-200">
              <li>
                <a
                  href="https://github.com/topics/hacktoberfest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Find Hacktoberfest Projects on GitHub"
                >
                  Find Projects
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/profile/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Register for Hacktoberfest Event"
                >
                  Register Event
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/participation/#rules"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Hacktoberfest Event Rules"
                >
                  Event Rules
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/participation/#pr-mr-details"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Submit Pull Request for Hacktoberfest"
                >
                  Submit PR
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Contact</h4>
            <ul className="space-y-2 text-gray-600 dark:text-indigo-200">
              <li>
                <a
                  href="https://hacktoberfest.com/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Hacktoberfest Support"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/about/#sponsors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Hacktoberfest Sponsors"
                >
                  Sponsors
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/about/#partners"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Hacktoberfest Partners"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/brand-guidelines/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
                  aria-label="Hacktoberfest Press Kit"
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-indigo-200 mb-4 md:mb-0">
            <p>
              © 2025 Hacktoberfest Contribution Site. Built with ❤️ for open
              source.
            </p>
          </div>
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-indigo-300">
            <a
              href="https://hacktoberfest.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black rounded px-1"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
            <a
              href="https://hacktoberfest.com/terms-of-service/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black rounded px-1"
              aria-label="Terms of Service"
            >
              Terms of Service
            </a>
            <a
              href="https://hacktoberfest.com/participation/#values"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
              aria-label="Code of Conduct"
            >
              Code of Conduct
            </a>
            <a href="https://feed-x-widget.vercel.app/?projectId=31&projectName=hacktoberfest"
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
              aria-label="Provide Feedback"
            >
              Feedback
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
