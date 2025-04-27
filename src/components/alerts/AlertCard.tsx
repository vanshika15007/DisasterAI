import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, FileWarning, MapPin, Calendar, Clock } from 'lucide-react';
import { Alert } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface AlertCardProps {
  alert: Alert;
  detailed?: boolean;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, detailed = false }) => {
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'flood':
        return <AlertTriangle className="h-6 w-6 text-blue-600" />;
      case 'wildfire':
        return <AlertTriangle className="h-6 w-6 text-orange-600" />;
      case 'earthquake':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'tornado':
        return <AlertTriangle className="h-6 w-6 text-green-600" />;
      case 'hurricane':
        return <AlertTriangle className="h-6 w-6 text-purple-600" />;
      default:
        return <FileWarning className="h-6 w-6 text-gray-600" />;
    }
  };

  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (isoString: string) => {
    try {
      return formatDistanceToNow(new Date(isoString), { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`border rounded-lg overflow-hidden shadow-sm ${
        alert.severity === 'high' ? 'border-red-300' : 'border-gray-200'
      }`}
    >
      <div className={`p-4 ${alert.severity === 'high' ? 'bg-red-50' : 'bg-white'}`}>
        <div className="flex items-start">
          <div className="mr-4 mt-1">{getAlertIcon()}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900">{alert.title}</h3>
              <span className={`text-xs rounded-full px-2 py-1 font-medium ${getSeverityColor()}`}>
                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{alert.description}</p>
            
            <div className="flex flex-wrap text-sm text-gray-600 mb-4 gap-y-2">
              <div className="flex items-center mr-4">
                <MapPin size={16} className="mr-1" />
                <span>{alert.region}</span>
              </div>
              <div className="flex items-center mr-4">
                <Calendar size={16} className="mr-1" />
                <span>Issued {formatTime(alert.createdAt)}</span>
              </div>
              {alert.expiresAt && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>Expires {formatTime(alert.expiresAt)}</span>
                </div>
              )}
            </div>
            
            {alert.actions && (
              <div className="flex flex-wrap gap-2">
                {alert.actions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.url}
                    className={`text-sm font-medium px-4 py-2 rounded-md ${
                      action.type === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertCard;