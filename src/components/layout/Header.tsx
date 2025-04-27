import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, AlertTriangle, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAlerts } from '../../contexts/AlertContext';
import { useTheme } from '../../contexts/ThemeContext';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { alerts } = useAlerts();
  const { theme, toggleTheme } = useTheme();
  const activeAlerts = alerts.filter(alert => alert.severity === 'high').length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-800 shadow-md py-2' 
          : 'bg-transparent dark:bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
            <span className="text-xl font-bold text-red-600">DisasterAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks isActive={isActive} />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-600" size={20} />
              )}
            </button>

            {activeAlerts > 0 && (
              <Link 
                to="/alerts" 
                className="flex items-center text-red-600 dark:text-red-400 animate-pulse font-semibold"
              >
                <AlertTriangle size={20} className="mr-1" />
                <span className="mr-1">Active Alerts</span>
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {activeAlerts}
                </span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-600" size={20} />
              )}
            </button>
            <button 
              className="text-blue-900 dark:text-blue-100 p-2" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <MobileNavLinks isActive={isActive} />

              {activeAlerts > 0 && (
                <Link 
                  to="/alerts" 
                  className="flex items-center text-red-600 dark:text-red-400 py-2 animate-pulse font-semibold"
                >
                  <AlertTriangle size={20} className="mr-1" />
                  <span className="mr-1">Active Alerts</span>
                  <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {activeAlerts}
                  </span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinksProps {
  isActive: (path: string) => boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isActive }) => (
  <>
    <Link
      to="/"
      className={`font-medium transition-all ${
        isActive('/') 
          ? 'text-red-600' 
          : 'text-blue-700 dark:text-blue-300 hover:text-red-600'
      }`}
    >
      Home
    </Link>
    <Link
      to="/chatbot"
      className={`font-medium transition-all ${
        isActive('/chatbot') 
          ? 'text-red-600' 
          : 'text-blue-700 dark:text-blue-300 hover:text-red-600'
      }`}
    >
      AI Assistant
    </Link>
    <Link
      to="/resources"
      className={`font-medium transition-all ${
        isActive('/resources') 
          ? 'text-red-600' 
          : 'text-blue-700 dark:text-blue-300 hover:text-red-600'
      }`}
    >
      Resources
    </Link>
    <Link
      to="/alerts"
      className={`font-medium transition-all ${
        isActive('/alerts') 
          ? 'text-red-600' 
          : 'text-blue-700 dark:text-blue-300 hover:text-red-600'
      }`}
    >
      Alerts
    </Link>
    <Link
      to="/prepare"
      className={`font-medium transition-all ${
        isActive('/prepare') 
          ? 'text-red-600' 
          : 'text-blue-700 dark:text-blue-300 hover:text-red-600'
      }`}
    >
      Prepare
    </Link>
  </>
);

const MobileNavLinks: React.FC<NavLinksProps> = ({ isActive }) => (
  <>
    <Link
      to="/"
      className={`py-2 font-medium text-lg border-b border-gray-100 dark:border-gray-700 ${
        isActive('/') 
          ? 'text-red-600' 
          : 'text-blue-700 dark:text-blue-300'
      }`}
    >
      Home
    </Link>
    <Link
      to="/chatbot"
      className={`py-2 font-medium text-lg border-b border-gray-100 dark:border-gray-700 ${
        isActive('/chatbot') 
          ? 'text-red-600' 
          : 'text-blue-700 dark:text-blue-300'
      }`}
    >
      AI Assistant
    </Link>
    <Link
      to="/resources"
      className={`py-2 font-medium text-lg border-b border-gray-100 dark:border-gray-700 ${
        isActive('/resources') 
          ? 'text-red-600' 
          : 'text-blue-700 dark:text-blue-300'
      }`}
    >
      Resources
    </Link>
    <Link
      to="/alerts"
      className={`py-2 font-medium text-lg border-b border-gray-100 dark:border-gray-700 ${
        isActive('/alerts') 
          ? 'text-red-600' 
          : 'text-blue-700 dark:text-blue-300'
      }`}
    >
      Alerts
    </Link>
    <Link
      to="/prepare"
      className={`py-2 font-medium text-lg ${
        isActive('/prepare') 
          ? 'text-red-600' 
          : 'text-blue-700 dark:text-blue-300'
      }`}
    >
      Prepare
    </Link>
  </>
);

export default Header;
