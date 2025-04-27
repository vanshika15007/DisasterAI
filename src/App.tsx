import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AlertProvider } from './contexts/AlertContext';
import { ChatProvider } from './contexts/ChatContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ChatbotPage from './pages/ChatbotPage';
import ResourcesPage from './pages/ResourcesPage';
import AlertsPage from './pages/AlertsPage';
import PreparePage from './pages/PreparePage';
import NotFoundPage from './pages/NotFoundPage';
import FamilySafetyPlanPage from './pages/FamilySafetyPlanPage';
import MobileAppDownloadPage from './pages/MobileAppDownloadPage';
import DisasterTypesGuidePage from './pages/DisasterTypesGuidePage';
import CustomPlanPage from './pages/CustomPlanPage'; // 👉 ADD THIS IMPORT

// Scroll to top component
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AlertProvider>
          <ChatProvider>
            <div className="flex flex-col min-h-screen transition-colors duration-200">
              <ScrollToTop />
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/chatbot" element={<ChatbotPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/alerts" element={<AlertsPage />} />
                  <Route path="/prepare" element={<PreparePage />} />
                  <Route path="/family-safety-plan" element={<FamilySafetyPlanPage />} />
                  <Route path="/mobile-app-download" element={<MobileAppDownloadPage />} />
                  <Route path="/disaster-types-guide" element={<DisasterTypesGuidePage />} />
                  <Route path="/custom-plan" element={<CustomPlanPage />} /> {/* 👉 ADD THIS ROUTE */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ChatProvider>
        </AlertProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
