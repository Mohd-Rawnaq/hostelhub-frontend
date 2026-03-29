import React, { useState, useEffect } from 'react';
import { Home, User, MapPin, Calendar, DollarSign, CheckCircle, Clock, XCircle, LogOut } from 'lucide-react';
import API from '../utils/api';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'profile'

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'student') {
      alert('Please login as student');
      window.location.href = '/login';
      return;
    }

    const userData = JSON.parse(localStorage.getItem('user'));
    setStudent(userData);
    
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Import API: import API from '../utils/api';
      const response = await API.get('/booking/my-bookings');
      setBookings(response.data);
      
      // Dummy data for now
    //   const dummyBookings = [
    //     {
    //       _id: '1',
    //       hostel: {
    //         name: 'Green Valley Hostel',
    //         location: 'Near JNTU College',
    //         city: 'Hyderabad',
    //         price: 5000
    //       },
    //       owner: {
    //         ownerName: 'Rajesh Kumar',
    //         businessName: 'Green Valley Hostels',
    //         phone: '9123456789',
    //         email: 'rajesh@example.com'
    //       },
    //       price: 5000,
    //       status: 'pending',
    //       bookingDate: new Date().toISOString()
    //     },
    //     {
    //       _id: '2',
    //       hostel: {
    //         name: 'Student Paradise',
    //         location: 'Kukatpally',
    //         city: 'Hyderabad',
    //         price: 6500
    //       },
    //       owner: {
    //         ownerName: 'Suresh Reddy',
    //         businessName: 'Paradise Hostels',
    //         phone: '9876543210',
    //         email: 'suresh@example.com'
    //       },
    //       price: 6500,
    //       status: 'approved',
    //       bookingDate: new Date(Date.now() - 86400000).toISOString()
    //     }
    //   ];
    //   setBookings(dummyBookings);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Rejected' },
      cancelled: { color: 'bg-gray-100 text-gray-800', icon: XCircle, text: 'Cancelled' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {config.text}
      </span>
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
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
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="/list-hostels" className="text-gray-700 hover:text-blue-600">Browse Hostels</a>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-red-600"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {student.name}!</h1>
          <p className="text-xl text-blue-100">{student.college}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'bookings' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
              <p className="text-gray-600">Manage and track your hostel bookings</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">Start exploring hostels and make your first booking!</p>
                <Link
                  to="/list-hostels"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Browse Hostels
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {booking.hostel.name}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{booking.hostel.location}, {booking.hostel.city}</span>
                        </div>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Price per Month</p>
                        <div className="flex items-center text-lg font-semibold text-gray-900">
                          <DollarSign className="w-5 h-5 text-blue-600 mr-1" />
                          ₹{booking.price.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Booking Date</p>
                        <div className="flex items-center text-gray-900">
                          <Calendar className="w-4 h-4 text-blue-600 mr-1" />
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Owner</p>
                        <p className="font-medium text-gray-900">{booking.owner.ownerName}</p>
                      </div>
                    </div>

                    {booking.status === 'approved' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">Booking Approved!</h4>
                        <p className="text-sm text-green-700 mb-2">Contact the owner to complete the process:</p>
                        <div className="space-y-1 text-sm text-green-800">
                          <p>📞 Phone: {booking.owner.phone}</p>
                          <p>📧 Email: {booking.owner.email}</p>
                        </div>
                      </div>
                    )}

                    {booking.status === 'pending' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          Your booking request is pending. The owner will review it soon.
                        </p>
                      </div>
                    )}

                    {booking.status === 'rejected' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">
                          Unfortunately, this booking request was rejected. You can try booking a different hostel.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              <p className="text-gray-600">Your personal details</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900">{student.name}</h3>
                  <p className="text-gray-600">{student.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <p className="text-gray-900">{student.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{student.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{student.phone}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College/University</label>
                  <p className="text-gray-900">{student.college}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}