import React, { useState, useEffect } from 'react';
import { Home, MapPin, Star, Users, Search, Filter, DollarSign, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { useParams } from 'react-router-dom';
import params from 'react-router-dom';
import searchParams from 'react-router-dom';
import URLSearchParams from 'react-router-dom';

export default function HostelListing() {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    priceRange: 'all',
    roomType: 'all',
    gender: 'all',
    amenities: []
  });

  const availableAmenities = ['WiFi', 'Mess', 'Laundry', '24/7 Security', 'Gym', 'AC Rooms', 'Parking'];

  // Fetch hostels from backend
  useEffect(() => {
    fetchHostels();

    // Read search params from URL
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    const priceParam = params.get('price');

    if (searchParam) setSearchTerm(searchParam);
    if (priceParam) setFilters(prev => ({ ...prev, priceRange: priceParam }));
  }, []);

  const fetchHostels = async () => {
    try {
      setLoading(true);
      // Import API at the top: import API from '../utils/api';
      const response = await API.get('/hostel');
      setHostels(response.data);
      setFilteredHostels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hostels:', error);
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...hostels];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(hostel =>
        hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(hostel => {
        if (filters.priceRange === '0-5000') return hostel.price <= 5000;
        if (filters.priceRange === '5000-7000') return hostel.price > 5000 && hostel.price <= 7000;
        if (filters.priceRange === '7000+') return hostel.price > 7000;
        return true;
      });
    }

    // Room type filter
    if (filters.roomType !== 'all') {
      filtered = filtered.filter(hostel => hostel.roomType === filters.roomType);
    }

    // Gender filter
    if (filters.gender !== 'all') {
      filtered = filtered.filter(hostel => hostel.gender === filters.gender);
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hostel =>
        filters.amenities.every(amenity => hostel.amenities.includes(amenity))
      );
    }

    setFilteredHostels(filtered);
  }, [searchTerm, filters, hostels]);

  const toggleAmenityFilter = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: 'all',
      roomType: 'all',
      gender: 'all',
      amenities: []
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HostelHub</span>
            </div>

            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="/student-dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
                className="text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Hostel</h1>
          <p className="text-xl text-blue-100">Browse through {hostels.length} available hostels</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, location, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Filter className="w-5 h-5" />
              Filters
              {(filters.priceRange !== 'all' || filters.roomType !== 'all' || filters.gender !== 'all' || filters.amenities.length > 0) && (
                <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-5000">Under ₹5,000</option>
                    <option value="5000-7000">₹5,000 - ₹7,000</option>
                    <option value="7000+">Above ₹7,000</option>
                  </select>
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                  <select
                    value={filters.roomType}
                    onChange={(e) => setFilters(prev => ({ ...prev, roomType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Triple">Triple</option>
                    <option value="Dormitory">Dormitory</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={filters.gender}
                    onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                    <option value="Co-ed">Co-ed</option>
                  </select>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {availableAmenities.map(amenity => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenityFilter(amenity)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${filters.amenities.includes(amenity)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hostel Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading hostels...</p>
          </div>
        ) : filteredHostels.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No hostels found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Showing {filteredHostels.length} of {hostels.length} hostels
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHostels.map((hostel) => (
                <Link
                  key={hostel._id}
                  to={`/hostel/${hostel._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer block"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <Home className="w-16 h-16 text-white opacity-50" />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{hostel.name}</h3>
                      <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-blue-600 fill-current mr-1" />
                        <span className="text-sm font-semibold text-blue-600">{hostel.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hostel.location}, {hostel.city}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{hostel.description}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {hostel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {hostel.amenities.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          +{hostel.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {hostel.roomType}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {hostel.gender}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">₹{hostel.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">per month</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">{hostel.rooms.available} available</div>
                        <div className="text-xs text-gray-500">of {hostel.rooms.total} rooms</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}