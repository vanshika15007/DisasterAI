import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Smartphone, AlertTriangle, Map, Phone } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              
              <span className="text-xl font-bold">DisasterAI</span>
            </div>
            <p className="text-slate-300 mb-4">
              AI-powered disaster assistance platform helping communities prepare, respond, and recover effectively.
            </p>
            <div className="flex space-x-4">
              {/* Instagram Link - Red Cross */}
              <a href="https://www.instagram.com/redcross/" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram h-6 w-6"></i>
              </a>

              {/* Twitter Link - FEMA */}
              <a href="https://twitter.com/fema" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter h-6 w-6"></i>
              </a>

              {/* Facebook Link - Red Cross */}
              <a href="https://www.facebook.com/redcross" className="text-slate-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook h-6 w-6"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-slate-300 hover:text-white transition-colors">AI Assistant</Link>
              </li>
              <li>
                <Link to="/resources" className="text-slate-300 hover:text-white transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/alerts" className="text-slate-300 hover:text-white transition-colors">Alerts</Link>
              </li>
              <li>
                <Link to="/prepare" className="text-slate-300 hover:text-white transition-colors">Prepare</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:911" className="text-slate-300 hover:text-white transition-colors">
                  Emergency: 911
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:211" className="text-slate-300 hover:text-white transition-colors">
                  Community Resources: 211
                </a>
              </li>
              <li className="flex items-center">
                <Map size={16} className="mr-2" />
                <a href="https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                  Find Shelters
                </a>
              </li>
              <li className="flex items-center">
                <AlertTriangle size={16} className="mr-2" />
                <a href="https://www.fema.gov/about/offices/emergency-management" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                  Report Emergency
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Disaster Preparedness</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Shield size={16} className="mr-2" />
                <a href="https://www.ready.gov/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                  Disaster Preparedness
                </a>
              </li>
              <li className="flex items-center">
                <Shield size={16} className="mr-2" />
                <a href="https://www.ready.gov/plan" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                  Family Safety Plan
                </a>
              </li>
              <li className="flex items-center">
                <Smartphone size={16} className="mr-2" />
                <a href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/mobile-apps.html" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                  Mobile App Download
                </a>
              </li>
              <li className="flex items-center">
                <AlertTriangle size={16} className="mr-2" />
                <a href="https://www.ready.gov/types-disasters" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                  Disaster Types Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} DisasterAI. All rights reserved.
          </p>
          <div className="text-slate-400 text-sm flex items-center">
            <span>Made with </span>
            <Heart size={14} className="mx-1 text-red-500" />
            <span> using Groq + Steller AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
