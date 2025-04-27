import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BellRing, Filter, Check, AlertTriangle } from 'lucide-react';
import { useAlerts } from '../contexts/AlertContext';
import AlertCard from '../components/alerts/AlertCard';

const AlertsPage: React.FC = () => {
  const { alerts, loading, error } = useAlerts();
  const [filter, setFilter] = useState<{
    severity: 'all' | 'high' | 'medium' | 'low';
    type: 'all' | 'hurricane' | 'flood' | 'wildfire' | 'earthquake' | 'tornado' | 'other';
  }>({
    severity: 'all',
    type: 'all',
  });

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filter.severity === 'all' || alert.severity === filter.severity;
    const typeMatch = filter.type === 'all' || alert.type === filter.type;
    return severityMatch && typeMatch;
  });

  const handleReportEmergency = () => {
    alert('In a real application, this would open a form to report an emergency or call emergency services.');
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BellRing size={32} className="mr-3 text-red-600" />
                Emergency Alerts
              </h1>
              <p className="text-gray-600 mt-2">
                Current alerts and warnings for your area
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReportEmergency}
              className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center"
            >
              <AlertTriangle size={20} className="mr-2" />
              Report Emergency
            </motion.button>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center mb-3">
              <Filter size={20} className="mr-2 text-gray-600" />
              <h3 className="font-semibold text-gray-800">Filter Alerts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                <div className="flex flex-wrap gap-2">
                  <FilterButton 
                    label="All" 
                    active={filter.severity === 'all'} 
                    onClick={() => setFilter(prev => ({ ...prev, severity: 'all' }))} 
                  />
                  <FilterButton 
                    label="High" 
                    active={filter.severity === 'high'} 
                    onClick={() => setFilter(prev => ({ ...prev, severity: 'high' }))} 
                    color="red"
                  />
                  <FilterButton 
                    label="Medium" 
                    active={filter.severity === 'medium'} 
                    onClick={() => setFilter(prev => ({ ...prev, severity: 'medium' }))} 
                    color="orange"
                  />
                  <FilterButton 
                    label="Low" 
                    active={filter.severity === 'low'} 
                    onClick={() => setFilter(prev => ({ ...prev, severity: 'low' }))} 
                    color="green"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="flex flex-wrap gap-2">
                  <FilterButton 
                    label="All" 
                    active={filter.type === 'all'} 
                    onClick={() => setFilter(prev => ({ ...prev, type: 'all' }))} 
                  />
                  <FilterButton 
                    label="Hurricane" 
                    active={filter.type === 'hurricane'} 
                    onClick={() => setFilter(prev => ({ ...prev, type: 'hurricane' }))} 
                  />
                  <FilterButton 
                    label="Flood" 
                    active={filter.type === 'flood'} 
                    onClick={() => setFilter(prev => ({ ...prev, type: 'flood' }))} 
                  />
                  <FilterButton 
                    label="Wildfire" 
                    active={filter.type === 'wildfire'} 
                    onClick={() => setFilter(prev => ({ ...prev, type: 'wildfire' }))} 
                  />
                  <FilterButton 
                    label="Earthquake" 
                    active={filter.type === 'earthquake'} 
                    onClick={() => setFilter(prev => ({ ...prev, type: 'earthquake' }))} 
                  />
                  <FilterButton 
                    label="Tornado" 
                    active={filter.type === 'tornado'} 
                    onClick={() => setFilter(prev => ({ ...prev, type: 'tornado' }))} 
                  />
                  <FilterButton 
                    label="Other" 
                    active={filter.type === 'other'} 
                    onClick={() => setFilter(prev => ({ ...prev, type: 'other' }))} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Alerts List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p>{error}</p>
            </div>
          ) : filteredAlerts.length > 0 ? (
            <div className="space-y-6">
              {filteredAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} detailed />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Check size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Alerts Found</h3>
              <p className="text-gray-600">
                There are currently no alerts matching your selected filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: 'default' | 'red' | 'orange' | 'green';
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  active, 
  onClick, 
  color = 'default' 
}) => {
  const getColorClasses = () => {
    if (active) {
      switch (color) {
        case 'red':
          return 'bg-red-600 text-white';
        case 'orange':
          return 'bg-orange-600 text-white';
        case 'green':
          return 'bg-green-600 text-white';
        default:
          return 'bg-blue-600 text-white';
      }
    }
    return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${getColorClasses()}`}
    >
      {label}
    </button>
  );
};

export default AlertsPage;