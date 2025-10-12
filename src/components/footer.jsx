import React from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-lg text-white py-16 mt-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
              Hacktoberfest
            </h3>
            <p className="text-indigo-200 mb-4">
              A month-long celebration of open source software run by
              DigitalOcean.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/topics/hacktoberfest"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-white hover:text-pink-400 transition-transform transform hover:scale-110"
              >
                <FaGithub size={24} />
              </a>

              <a
                href="https://x.com/hacktoberfest"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-white hover:text-pink-400 transition-transform transform hover:scale-110"
              >
                <FaTwitter size={24} />
              </a>

              <a
                href="https://www.linkedin.com/company/hacktoberfest/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white hover:text-pink-400 transition-transform transform hover:scale-110"
              >
                <FaLinkedin size={24} />
              </a>

              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhacktoberfest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white hover:text-pink-400 transition-transform transform hover:scale-110"
              >
                <FaFacebook size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-indigo-200">
              <li>
                <a
                  href="https://hacktoberfest.com/participation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/resources/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/faq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/community/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Participate
            </h4>
            <ul className="space-y-2 text-indigo-200">
              <li>
                <a
                  href="https://github.com/topics/hacktoberfest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Find Projects
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/profile/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Register Event
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/participation/#rules"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Event Rules
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/participation/#pr-mr-details"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Submit PR
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-indigo-200">
              <li>
                <a
                  href="https://hacktoberfest.com/contact/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/about/#sponsors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Sponsors
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/about/#partners"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Partners
                </a>
              </li>
              <li>
                <a
                  href="https://hacktoberfest.com/brand-guidelines/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-indigo-200 mb-4 md:mb-0">
            <p>
              © 2025 Hacktoberfest Contribution Site. Built with ❤️ for open
              source.
            </p>
          </div>
          <div className="flex space-x-6 text-sm text-indigo-300">
            <a
              href="https://hacktoberfest.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://hacktoberfest.com/terms-of-service/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="https://hacktoberfest.com/participation/#values"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
