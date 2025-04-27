import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Globe, Clock, Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { mockResources, mockEmergencyContacts } from '../data/mockData';
import type { Resource, EmergencyContact } from '../types';

// We need to add CSS for Leaflet
const ResourcesPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources);
  const mapRef = useRef<any>(null);

  const getMarkerIcon = (type: string) => {
    let iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
    return new Icon({
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    if (mapRef.current) {
      mapRef.current.setView([resource.coordinates.lat, resource.coordinates.lng], 15);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'limited':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearchAndFilter = () => {
    let updatedResources = mockResources;

    if (filter !== 'all') {
      updatedResources = updatedResources.filter((resource) => resource.type === filter);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      updatedResources = updatedResources.filter((resource) =>
        resource.name.toLowerCase().includes(query) ||
        resource.address.toLowerCase().includes(query) ||
        resource.city.toLowerCase().includes(query) ||
        resource.state.toLowerCase().includes(query)
      );
    }

    setFilteredResources(updatedResources);
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchQuery, filter]);

  useEffect(() => {
    // Add Leaflet CSS when component mounts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
    link.crossOrigin = '';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Resources</h1>
          <p className="text-gray-600 mb-8">Find nearby shelters, medical facilities, food, and supplies</p>

          {/* Filters and Search */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="flex space-x-2 mb-4 md:mb-0 overflow-x-auto pb-2">
                {['all', 'shelter', 'hospital', 'food', 'supplies'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                      filter === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type === 'all' ? 'All Resources' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, city, or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Map and Resources */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resources List */}
            <div className="lg:col-span-1 order-2 lg:order-1 h-96 lg:h-auto overflow-y-auto">
              <h2 className="text-xl font-semibold mb-3">Available Resources</h2>
              {filteredResources.length > 0 ? (
                <div className="space-y-4">
                  {filteredResources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      whileHover={{ y: -2 }}
                      onClick={() => handleResourceClick(resource)}
                      className={`p-4 rounded-lg border cursor-pointer ${
                        selectedResource?.id === resource.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(resource.status)}`}>
                          {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <div className="flex items-center mb-1">
                          <MapPin size={14} className="mr-1" />
                          <span>{resource.address}, {resource.city}, {resource.state}</span>
                        </div>
                        {resource.phone && (
                          <div className="flex items-center mb-1">
                            <Phone size={14} className="mr-1" />
                            <span>{resource.phone}</span>
                          </div>
                        )}
                        {resource.capacity && (
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>
                              {resource.capacity.available} of {resource.capacity.total} spots available
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-gray-600">No resources match your current search or filter.</p>
                  <button
                    onClick={() => { setFilter('all'); setSearchQuery(''); }}
                    className="mt-3 text-blue-600 hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="lg:col-span-2 order-1 lg:order-2 h-96 lg:h-auto">
              <div className="h-full rounded-lg overflow-hidden border border-gray-200">
                {typeof window !== 'undefined' && (
                  <MapContainer
                    center={[34.052235, -118.243683]}
                    zoom={12}
                    className="h-full"
                    whenCreated={(map) => (mapRef.current = map)}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredResources.map((resource) => (
                      <Marker
                        key={resource.id}
                        position={[resource.coordinates.lat, resource.coordinates.lng]}
                        icon={getMarkerIcon(resource.type)}
                        eventHandlers={{
                          click: () => setSelectedResource(resource),
                        }}
                      >
                        <Popup>
                          <div>
                            <h3 className="font-semibold">{resource.name}</h3>
                            <p className="text-sm">{resource.address}</p>
                            <p className="text-sm mt-1">
                              Status: 
                              <span className={`ml-1 ${
                                resource.status === 'open' ? 'text-green-600' :
                                resource.status === 'limited' ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                              </span>
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEmergencyContacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContactCardProps {
  contact: EmergencyContact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <h3 className="font-bold text-lg text-gray-900 mb-1">{contact.name}</h3>
      <p className="text-gray-600 text-sm mb-3">{contact.description}</p>
      <div className="space-y-2">
        <a href={`tel:${contact.phone}`} className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          <Phone size={18} className="mr-2" />
          {contact.phone}
        </a>
        {contact.website && (
          <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <Globe size={18} className="mr-2" />
            Website
          </a>
        )}
        <div className="flex items-center text-gray-600 text-sm">
          <Clock size={16} className="mr-2" />
          {contact.availability}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;  