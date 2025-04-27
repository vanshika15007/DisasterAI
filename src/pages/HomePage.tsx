import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Map, Bell, Shield, ArrowRight } from 'lucide-react';
import { useAlerts } from '../contexts/AlertContext';
import AlertCard from '../components/alerts/AlertCard';

const HomePage: React.FC = () => {
  const { alerts } = useAlerts();
  const highPriorityAlerts = alerts.filter(alert => alert.severity === 'high').slice(0, 2);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                AI-Powered Disaster Assistance When You Need It Most
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Get real-time information, personalized guidance, and critical resources during emergencies with our advanced AI platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/chatbot" 
                  className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <MessageSquare size={20} className="mr-2" />
                  Talk to AI Assistant
                </Link>
                <Link 
                  to="/alerts" 
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Bell size={20} className="mr-2" />
                  View Current Alerts
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <img 
                src="https://tse4.mm.bing.net/th/id/OIP.7S6mlp6Zcw_-mHm_axfCUAHaD4?rs=1&pid=ImgDetMain" 
                alt="AI Disaster Response" 
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Alerts Section (conditionally rendered) */}
      {highPriorityAlerts.length > 0 && (
        <section className="bg-red-50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-red-700 flex items-center">
                <Bell size={24} className="mr-2" />
                Active Emergency Alerts
              </h2>
              <Link to="/alerts" className="text-red-700 font-medium flex items-center hover:underline">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highPriorityAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">How DisasterAI Can Help You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides critical assistance before, during, and after disasters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="h-12 w-12 text-blue-500" />}
              title="AI Assistant"
              description="Get immediate answers and guidance from our AI powered by Groq + Steller technology."
              link="/chatbot"
            />
            <FeatureCard 
              icon={<Bell className="h-12 w-12 text-blue-500" />}
              title="Real-time Alerts"
              description="Receive location-based emergency notifications and critical updates."
              link="/alerts"
            />
            <FeatureCard 
              icon={<Map className="h-12 w-12 text-blue-500" />}
              title="Resource Locator"
              description="Find nearby shelters, supplies, and emergency services when you need them most."
              link="/resources"
            />
            <FeatureCard 
              icon={<Shield className="h-12 w-12 text-blue-500" />}
              title="Preparation Guide"
              description="Create personalized disaster preparation plans for your family and location."
              link="/prepare"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Prepare Today for Tomorrow's Uncertainties</h2>
              <p className="text-lg mb-6 text-teal-100">
                Create your personalized disaster preparedness plan tailored to your location, household needs, and local hazards.
              </p>
              <Link 
                to="/prepare" 
                className="inline-flex items-center bg-white text-teal-900 px-6 py-3 rounded-lg font-semibold hover:bg-teal-100 transition-colors"
              >
                <Shield size={20} className="mr-2" />
                Create Your Plan
              </Link>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://assets.goaaa.com/image/upload/c_fill,g_auto,w_1170,h_593,q_auto:best/v1647566194/singularity-migrated-images/disaster-preparedness-emergency-kit-list-via-magazine-orJA20_DISASTER_supplies_3F.jpg.jpg" 
                alt="Family preparedness planning" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            Helping Communities Recover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="DisasterAI's chatbot helped my family find shelter and supplies during the flood. The real-time information was invaluable."
              author="Maria J."
              location="New Orleans, LA"
            />
            <TestimonialCard 
              quote="As an emergency manager, I rely on DisasterAI to coordinate resources and keep our community informed during wildfire season."
              author="Robert T."
              location="Sacramento, CA"
            />
            <TestimonialCard 
              quote="The preparation plan DisasterAI created for my family made all the difference when the hurricane hit. We knew exactly what to do."
              author="Sarah M."
              location="Miami, FL"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-blue-200 transition-all"
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link} className="text-blue-600 font-medium flex items-center hover:text-blue-800">
        Learn more <ArrowRight size={16} className="ml-1" />
      </Link>
    </motion.div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, location }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <p className="text-gray-700 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>
    </motion.div>
  );
};

export default HomePage;