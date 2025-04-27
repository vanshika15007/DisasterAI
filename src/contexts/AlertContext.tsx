import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockAlerts } from '../data/mockData';
import { Alert } from '../types';

interface AlertContextType {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  addAlert: (alert: Omit<Alert, 'id' | 'createdAt'>) => void;
  dismissAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        // In a real app, this would be an API call
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAlerts(mockAlerts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load alerts. Please try again later.');
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const addAlert = (alertData: Omit<Alert, 'id' | 'createdAt'>) => {
    const newAlert: Alert = {
      id: `alert-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...alertData,
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, loading, error, addAlert, dismissAlert }}>
      {children}
    </AlertContext.Provider>
  );
};