import React, { useState, useEffect } from 'react';
import { Home, MapPin, Star, Users, Bed, DollarSign, Phone, Mail, ArrowLeft, Check } from 'lucide-react';
import API from '../utils/api';

export default function HostelDetail() {
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Get hostel ID from URL (you'll use React Router params in real app)
  // For now, we'll use a hardcoded ID or get from URL
  const hostelId = window.location.pathname.split('/').pop();

  useEffect(() => {
    fetchHostelDetails();
  }, []);

  const fetchHostelDetails = async () => {
    try {
      setLoading(true);
      // Import API: import API from '../utils/api';
      const response = await API.get(`/hostel/${hostelId}`);
      setHostel(response.data);
      
      // Dummy data for now
      // const dummyHostel = {
      //   _id: '1',
      //   name: 'Green Valley Hostel',
      //   location: 'Near JNTU College',
      //   city: 'Hyderabad',
      //   address: '123 Main Street, Kukatpally, Hyderabad - 500072',
      //   price: 5000,
      //   description: 'Green Valley Hostel is a comfortable and affordable accommodation option for students. Located near JNTU College, it offers easy access to educational institutions and local amenities. The hostel provides a safe and friendly environment with modern facilities including WiFi, mess services, and 24/7 security. Our dedicated staff ensures a home-like atmosphere where students can focus on their studies while enjoying a comfortable living space.',
      //   amenities: ['WiFi', 'Mess', 'Laundry', '24/7 Security', 'Parking', 'Water Supply'],
      //   roomType: 'Double',
      //   gender: 'Boys',
      //   rating: 4.5,
      //   rooms: { total: 20, available: 5 },
      //   owner: {
      //     ownerName: 'Rajesh Kumar',
      //     businessName: 'Green Valley Hostels',
      //     phone: '9123456789',
      //     email: 'rajesh@example.com'
      //   }
      // };
      
      // setHostel(dummyHostel);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hostel details:', error);
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (!token) {
      alert('Please login to book a room');
      window.location.href = '/login';
      return;
    }

    if (userType !== 'student') {
      alert('Only students can book rooms');
      return;
    }

    if (hostel.rooms.available === 0) {
      alert('No rooms available');
      return;
    }

    try {
      setBookingLoading(true);
      
      // TODO: Create booking API
      const response = await API.post('/booking/create', {
        hostelId: hostel._id,
        price: hostel.price
      });
      
      alert('Booking request sent successfully! The owner will review your request.');
      
      setBookingLoading(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create booking');
      setBookingLoading(false);
    }
  };

  const isOwner = localStorage.getItem('userType') === 'owner';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading hostel details...</p>
        </div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Hostel not found</p>
          <button
            onClick={() => window.location.href = '/hostels'}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HostelHub</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="/hostels" className="text-gray-700 hover:text-blue-600">Browse Hostels</a>
              <a href="/student-dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => {
              const userType = localStorage.getItem('userType');
              if (userType === 'owner') {
                window.location.href = '/owner-dashboard';
              } else {
                window.history.back();
              }
            }}
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {localStorage.getItem('userType') === 'owner' ? 'Back to Dashboard' : 'Back to listings'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-96 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <Home className="w-32 h-32 text-white opacity-50" />
              </div>
            </div>

            {/* Hostel Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hostel.name}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{hostel.location}, {hostel.city}</span>
                  </div>
                </div>
                <div className="flex items-center bg-blue-100 px-3 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-blue-600 fill-current mr-1" />
                  <span className="text-lg font-semibold text-blue-600">{hostel.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <Bed className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-medium">{hostel.roomType} Sharing</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-medium">{hostel.gender} Hostel</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Home className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-medium">{hostel.rooms.available} Rooms Available</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-3">About this Hostel</h2>
                <p className="text-gray-700 leading-relaxed">{hostel.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hostel.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 mr-2 text-green-600" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <p className="text-gray-700">{hostel.address}</p>
            </div>

            {/* Owner Contact */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Owner</p>
                  <p className="font-semibold text-gray-900">{hostel.owner.ownerName}</p>
                  <p className="text-sm text-gray-600">{hostel.owner.businessName}</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  <a href={`tel:${hostel.owner.phone}`} className="hover:text-blue-600">
                    {hostel.owner.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  <a href={`mailto:${hostel.owner.email}`} className="hover:text-blue-600">
                    {hostel.owner.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-blue-600">₹{hostel.price.toLocaleString()}</span>
                  <span className="text-gray-600 ml-2">/ month</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Room Type</span>
                  <span className="font-semibold">{hostel.roomType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Gender</span>
                  <span className="font-semibold">{hostel.gender}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Available Rooms</span>
                  <span className={`font-semibold ${hostel.rooms.available === 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {hostel.rooms.available} of {hostel.rooms.total}
                  </span>
                </div>
              </div>

              {!isOwner && (
                <>
                  <button
                    onClick={handleBooking}
                    disabled={bookingLoading || hostel.rooms.available === 0}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                      hostel.rooms.available === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : bookingLoading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {hostel.rooms.available === 0 
                      ? 'No Rooms Available' 
                      : bookingLoading 
                      ? 'Processing...' 
                      : 'Request Booking'}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Your booking request will be sent to the owner for approval
                  </p>
                </>
              )}

              {isOwner && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-medium mb-2">This is your hostel</p>
                  <p className="text-xs text-blue-600">Manage bookings and availability from your dashboard</p>
                  <button
                    onClick={() => window.location.href = '/owner-dashboard'}
                    className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Why book with us?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Verified hostels and owners</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Secure booking process</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>24/7 customer support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}