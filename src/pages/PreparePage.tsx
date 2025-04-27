import React, { useState } from 'react';
import { Shield, ChevronRight, CheckCircle, Package, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockPreparednessItems } from '../data/mockData';
import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS
import type { PreparednessItem } from '../types';

const PreparePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const navigate = useNavigate(); // ✅ ADD THIS

  const categories = Array.from(new Set(mockPreparednessItems.map(item => item.category)));

  const filteredItems = selectedCategory
    ? mockPreparednessItems.filter(item => item.category === selectedCategory)
    : mockPreparednessItems;

  const handleCheckItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getCompletionPercentage = () => {
    const totalItems = mockPreparednessItems.length;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  const handleCreatePlanClick = () => {
    navigate('/custom-plan'); // ✅ Navigate to custom plan page
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Shield size={32} className="mr-3 text-blue-700" />
              Disaster Preparedness Plan
            </h1>
            <p className="text-gray-600 mt-2">
              Prepare your family and home for any emergency with our comprehensive checklist.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Your Preparation Progress</h2>
              <span className="text-blue-700 font-bold">{getCompletionPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <motion.div
                className="bg-blue-600 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getCompletionPercentage()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Complete your emergency preparedness checklist to ensure you're ready for any situation.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <div className="inline-flex space-x-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Items
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Preparedness Items */}
          <div className="space-y-4">
            {filteredItems.map(item => (
              <PreparednessItemCard
                key={item.id}
                item={item}
                checked={!!checkedItems[item.id]}
                onToggle={() => handleCheckItem(item.id)}
              />
            ))}
          </div>

          {/* Beyond the checklist */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <Info size={24} className="text-blue-700 mr-4 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Beyond the Checklist</h2>
                <p className="text-gray-700 mb-4">
                  Having emergency supplies is just one part of being prepared. Here are other important steps:
                </p>
                <ul className="space-y-3">
                  {[
                    'Create a family emergency communication plan',
                    'Practice evacuation routes from your home and neighborhood',
                    'Learn basic first aid and CPR',
                    'Sign up for local emergency alerts and warnings',
                    'Know how to shut off utilities at your home'
                  ].map((tip, idx) => (
                    <li key={idx} className="flex">
                      <ChevronRight size={20} className="text-blue-600 mr-2 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Create Plan Button */}
          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreatePlanClick} // ✅ CLICK HANDLER ADDED
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg flex items-center shadow-lg"
            >
              <Shield size={20} className="mr-2" />
              Create Custom Preparedness Plan
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PreparednessItemCardProps {
  item: PreparednessItem;
  checked: boolean;
  onToggle: () => void;
}

const PreparednessItemCard: React.FC<PreparednessItemCardProps> = ({ item, checked, onToggle }) => {
  const priorityBadgeColor = () => {
    switch (item.priority) {
      case 'essential':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'recommended':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'optional':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg border ${
        checked ? 'border-green-300 bg-green-50' : 'border-gray-200'
      } p-4 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start">
        <div className="mr-4">
          <button
            onClick={onToggle}
            className={`w-6 h-6 rounded-full flex items-center justify-center border ${
              checked
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 bg-white'
            }`}
          >
            {checked && <CheckCircle size={16} />}
          </button>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <h3 className={`font-semibold text-lg ${checked ? 'text-gray-500' : 'text-gray-900'}`}>
              {item.name}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full border ${priorityBadgeColor()}`}
            >
              {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
            </span>
          </div>
          <p className={`text-sm mb-3 ${checked ? 'text-gray-400' : 'text-gray-600'}`}>
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Package size={16} className="mr-1" />
              <span>Recommended quantity: {item.quantity}</span>
            </div>
            <div className="text-sm">
              {checked ? (
                <span className="text-green-600 flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  Completed
                </span>
              ) : (
                <button
                  onClick={onToggle}
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Mark as ready
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PreparePage;
