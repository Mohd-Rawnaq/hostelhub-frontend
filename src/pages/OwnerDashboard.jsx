import React, { useState, useEffect } from 'react';
import { Home, Building2, User, MapPin, Calendar, DollarSign, CheckCircle, Clock, XCircle, LogOut, Plus, Mail, Phone, Edit } from 'lucide-react';
import API from '../utils/api';

export default function OwnerDashboard() {
  const [owner, setOwner] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'owner') {
      alert('Please login as owner');
      window.location.href = '/login';
      return;
    }

    const userData = JSON.parse(localStorage.getItem('user'));
    setOwner(userData);
    
    fetchBookings();
    fetchHostels();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Import API: import API from '../utils/api';
      const response = await API.get('/booking/owner-bookings');
      setBookings(response.data);
      
      // Dummy data
      // const dummyBookings = [];
      // setBookings(dummyBookings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const fetchHostels = async () => {
    try {
      // Import API: import API from '../utils/api';
      const response = await API.get('/hostel/owner-hostels');
      setHostels(response.data);
      
      // For demo - will be replaced with real data
      // setHostels([]);
    } catch (error) {
      console.error('Error fetching hostels:', error);
    }
  };

  const handleUpdateAvailability = async (hostelId, newAvailable) => {
    try {
      // Import API: import API from '../utils/api';
      await API.put(`/hostel/${hostelId}/update-availability`, {
        available: newAvailable
      });
      
      alert('Availability updated successfully!');
      fetchHostels();
    } catch (error) {
      alert('Failed to update availability');
    }
  };

  const handleApproveBooking = async (bookingId) => {
    try {
      // Import API: import API from '../utils/api';
      await API.put(`/booking/${bookingId}/approve`);
      alert('Booking approved successfully!');
      fetchBookings();
    } catch (error) {
      alert('Failed to approve booking');
    }
  };

  const handleRejectBooking = async (bookingId) => {
    try {
      // Import API: import API from '../utils/api';
      await API.put(`/booking/${bookingId}/reject`);
      alert('Booking rejected');
      fetchBookings();
    } catch (error) {
      alert('Failed to reject booking');
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

  if (!owner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    totalHostels: hostels.length,
    totalRooms: hostels.reduce((sum, h) => sum + h.rooms.total, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HostelHub</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
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

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Welcome, {owner.ownerName}!</h1>
          <p className="text-xl text-blue-100">{owner.businessName}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-600 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">My Hostels</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalHostels}</p>
              </div>
              <Building2 className="w-12 h-12 text-blue-600 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Rooms</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalRooms}</p>
              </div>
              <Home className="w-12 h-12 text-blue-600 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Booking Requests ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('hostels')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'hostels'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Hostels ({hostels.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'bookings' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Booking Requests</h2>
              <p className="text-gray-600">Manage student booking requests</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600">Booking requests will appear here</p>
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

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Student Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-gray-700">{booking.student.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-blue-600 mr-2" />
                          <a href={`mailto:${booking.student.email}`} className="text-gray-700 hover:text-blue-600">
                            {booking.student.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-blue-600 mr-2" />
                          <a href={`tel:${booking.student.phone}`} className="text-gray-700 hover:text-blue-600">
                            {booking.student.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-gray-700">{booking.student.college}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Price per Month</p>
                        <p className="text-lg font-semibold text-gray-900">₹{booking.price.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Booking Date</p>
                        <p className="text-gray-900">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-medium text-gray-900 capitalize">{booking.status}</p>
                      </div>
                    </div>

                    {booking.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApproveBooking(booking._id)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Approve Booking
                        </button>
                        <button
                          onClick={() => handleRejectBooking(booking._id)}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                        >
                          <XCircle className="w-5 h-5 mr-2" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'hostels' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Hostels</h2>
                <p className="text-gray-600">Manage your hostel listings</p>
              </div>
              <a
                href="/add-hostel"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Hostel
              </a>
            </div>

            {hostels.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hostels listed yet</h3>
                <p className="text-gray-600 mb-6">Start by adding your first hostel</p>
                <a
                  href="/add-hostel"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Hostel
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hostels.map((hostel) => (
                  <div key={hostel._id} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{hostel.name}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hostel.location}, {hostel.city}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="text-lg font-semibold text-blue-600">₹{hostel.price.toLocaleString()}/month</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Rooms</p>
                        <p className="text-lg font-semibold text-gray-900">{hostel.rooms.total}</p>
                      </div>
                    </div>

                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Available Rooms</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {hostel.rooms.available} <span className="text-base text-gray-500">/ {hostel.rooms.total}</span>
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full ${
                          hostel.rooms.available === 0 
                            ? 'bg-red-100 text-red-800' 
                            : hostel.rooms.available < 5 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {hostel.rooms.available === 0 ? 'Full' : hostel.rooms.available < 5 ? 'Low' : 'Available'}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Updates automatically when bookings are approved</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          const newAvailable = prompt(
                            `Enter available rooms (0-${hostel.rooms.total}):`, 
                            hostel.rooms.available
                          );
                          if (newAvailable !== null) {
                            const value = parseInt(newAvailable);
                            if (!isNaN(value) && value >= 0 && value <= hostel.rooms.total) {
                              handleUpdateAvailability(hostel._id, value);
                            } else {
                              alert(`Please enter a number between 0 and ${hostel.rooms.total}`);
                            }
                          }
                        }}
                        className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center text-sm"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          // TODO: Navigate to edit hostel page
                          alert('Edit hostel feature coming soon!');
                        }}
                        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Manage
                      </button>
                    </div>
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
              <p className="text-gray-600">Your business details</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                  <p className="text-gray-900">{owner.ownerName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <p className="text-gray-900">{owner.businessName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{owner.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{owner.phone}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <p className="text-gray-900">{owner.city}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <p className="text-gray-900">{owner.address}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}






// Old Code - Date: 10:07, 27/3/2026
// import React, { useState, useEffect } from 'react';
// import { Home, Building2, User, MapPin, Calendar, DollarSign, CheckCircle, Clock, XCircle, LogOut, Plus, Mail, Phone } from 'lucide-react';
// import API from '../utils/api';

// export default function OwnerDashboard() {
//   const [owner, setOwner] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [hostels, setHostels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'hostels', or 'profile'

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userType = localStorage.getItem('userType');
    
//     if (!token || userType !== 'owner') {
//       alert('Please login as owner');
//       window.location.href = '/login';
//       return;
//     }

//     const userData = JSON.parse(localStorage.getItem('user'));
//     setOwner(userData);
    
//     fetchBookings();
//     fetchHostels();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       // Import API: import API from '../utils/api';
//       const response = await API.get('/booking/owner-bookings');
//       setBookings(response.data);
      
//       // Dummy data
//     //   const dummyBookings = [
//     //     {
//     //       _id: '1',
//     //       student: {
//     //         name: 'John Doe',
//     //         email: 'john@example.com',
//     //         phone: '9876543210',
//     //         college: 'JNTU College'
//     //       },
//     //       hostel: {
//     //         name: 'Green Valley Hostel',
//     //         location: 'Near JNTU College',
//     //         city: 'Hyderabad',
//     //         price: 5000
//     //       },
//     //       price: 5000,
//     //       status: 'pending',
//     //       bookingDate: new Date().toISOString()
//     //     },
//     //     {
//     //       _id: '2',
//     //       student: {
//     //         name: 'Sarah Smith',
//     //         email: 'sarah@example.com',
//     //         phone: '9123456789',
//     //         college: 'CBIT'
//     //       },
//     //       hostel: {
//     //         name: 'Green Valley Hostel',
//     //         location: 'Near JNTU College',
//     //         city: 'Hyderabad',
//     //         price: 5000
//     //       },
//     //       price: 5000,
//     //       status: 'approved',
//     //       bookingDate: new Date(Date.now() - 86400000).toISOString()
//     //     }
//     //   ];
      
//     //   setBookings(dummyBookings);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//       setLoading(false);
//     }
//   };

//   const fetchHostels = async () => {
//     try {
//       // For now using dummy data
//       // const dummyHostels = [
//       //   {
//       //     _id: '1',
//       //     name: 'Green Valley Hostel',
//       //     location: 'Near JNTU College',
//       //     city: 'Hyderabad',
//       //     price: 5000,
//       //     rooms: { total: 20, available: 5 },
//       //     rating: 4.5
//       //   }
//       // ];
//       // setHostels(dummyHostels);
//       const response = await API.get('/hostel/owner-hostels');
//       setHostels(response.data);
//     } catch (error) {
//       console.error('Error fetching hostels:', error);
//     }
//   };

//   const handleApproveBooking = async (bookingId) => {
//     try {
//       await API.put(`/booking/${bookingId}/approve`);
//       alert('Booking approved successfully!');
//       fetchBookings();
//     } catch (error) {
//       alert('Failed to approve booking');
//     }
//   };

//   const handleRejectBooking = async (bookingId) => {
//     try {
//       await API.put(`/booking/${bookingId}/reject`);
//       alert('Booking rejected');
//       fetchBookings();
//     } catch (error) {
//       alert('Failed to reject booking');
//     }
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pending' },
//       approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Approved' },
//       rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Rejected' },
//       cancelled: { color: 'bg-gray-100 text-gray-800', icon: XCircle, text: 'Cancelled' }
//     };

//     const config = statusConfig[status] || statusConfig.pending;
//     const Icon = config.icon;

//     return (
//       <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
//         <Icon className="w-4 h-4 mr-1" />
//         {config.text}
//       </span>
//     );
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = '/';
//   };

//   if (!owner) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   const stats = {
//     totalBookings: bookings.length,
//     pendingBookings: bookings.filter(b => b.status === 'pending').length,
//     totalHostels: hostels.length,
//     totalRooms: hostels.reduce((sum, h) => sum + h.rooms.total, 0)
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <Home className="w-8 h-8 text-blue-600" />
//               <span className="text-2xl font-bold text-gray-900">HostelHub</span>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center text-gray-700 hover:text-red-600"
//               >
//                 <LogOut className="w-5 h-5 mr-1" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl font-bold mb-2">Welcome, {owner.ownerName}!</h1>
//           <p className="text-xl text-blue-100">{owner.businessName}</p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Total Bookings</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
//               </div>
//               <Calendar className="w-12 h-12 text-blue-600 opacity-50" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Pending</p>
//                 <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
//               </div>
//               <Clock className="w-12 h-12 text-yellow-600 opacity-50" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">My Hostels</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.totalHostels}</p>
//               </div>
//               <Building2 className="w-12 h-12 text-blue-600 opacity-50" />
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm">Total Rooms</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.totalRooms}</p>
//               </div>
//               <Home className="w-12 h-12 text-blue-600 opacity-50" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="bg-white border-b mt-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex space-x-8">
//             <button
//               onClick={() => setActiveTab('bookings')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'bookings'
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Booking Requests ({bookings.length})
//             </button>
//             <button
//               onClick={() => setActiveTab('hostels')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'hostels'
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               My Hostels ({hostels.length})
//             </button>
//             <button
//               onClick={() => setActiveTab('profile')}
//               className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === 'profile'
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Profile
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {activeTab === 'bookings' && (
//           <div>
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">Booking Requests</h2>
//               <p className="text-gray-600">Manage student booking requests</p>
//             </div>

//             {loading ? (
//               <div className="text-center py-12">
//                 <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//               </div>
//             ) : bookings.length === 0 ? (
//               <div className="bg-white rounded-lg shadow-md p-12 text-center">
//                 <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
//                 <p className="text-gray-600">Booking requests will appear here</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {bookings.map((booking) => (
//                   <div key={booking._id} className="bg-white rounded-lg shadow-md p-6">
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="flex-1">
//                         <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                           {booking.hostel.name}
//                         </h3>
//                         <div className="flex items-center text-gray-600 mb-2">
//                           <MapPin className="w-4 h-4 mr-1" />
//                           <span className="text-sm">{booking.hostel.location}, {booking.hostel.city}</span>
//                         </div>
//                       </div>
//                       {getStatusBadge(booking.status)}
//                     </div>

//                     <div className="bg-gray-50 rounded-lg p-4 mb-4">
//                       <h4 className="font-semibold text-gray-900 mb-3">Student Details</h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                         <div className="flex items-center">
//                           <User className="w-4 h-4 text-blue-600 mr-2" />
//                           <span className="text-gray-700">{booking.student.name}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <Mail className="w-4 h-4 text-blue-600 mr-2" />
//                           <a href={`mailto:${booking.student.email}`} className="text-gray-700 hover:text-blue-600">
//                             {booking.student.email}
//                           </a>
//                         </div>
//                         <div className="flex items-center">
//                           <Phone className="w-4 h-4 text-blue-600 mr-2" />
//                           <a href={`tel:${booking.student.phone}`} className="text-gray-700 hover:text-blue-600">
//                             {booking.student.phone}
//                           </a>
//                         </div>
//                         <div className="flex items-center">
//                           <Building2 className="w-4 h-4 text-blue-600 mr-2" />
//                           <span className="text-gray-700">{booking.student.college}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                       <div>
//                         <p className="text-sm text-gray-600">Price per Month</p>
//                         <p className="text-lg font-semibold text-gray-900">₹{booking.price.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600">Booking Date</p>
//                         <p className="text-gray-900">{new Date(booking.bookingDate).toLocaleDateString()}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600">Status</p>
//                         <p className="font-medium text-gray-900 capitalize">{booking.status}</p>
//                       </div>
//                     </div>

//                     {booking.status === 'pending' && (
//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => handleApproveBooking(booking._id)}
//                           className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
//                         >
//                           <CheckCircle className="w-5 h-5 mr-2" />
//                           Approve Booking
//                         </button>
//                         <button
//                           onClick={() => handleRejectBooking(booking._id)}
//                           className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
//                         >
//                           <XCircle className="w-5 h-5 mr-2" />
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'hostels' && (
//           <div>
//             <div className="mb-6 flex justify-between items-center">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">My Hostels</h2>
//                 <p className="text-gray-600">Manage your hostel listings</p>
//               </div>
//               <a
//                 href="/add-hostel"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//               >
//                 <Plus className="w-5 h-5 mr-2" />
//                 Add New Hostel
//               </a>
//             </div>

//             {hostels.length === 0 ? (
//               <div className="bg-white rounded-lg shadow-md p-12 text-center">
//                 <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No hostels listed yet</h3>
//                 <p className="text-gray-600 mb-6">Start by adding your first hostel</p>
//                 <a
//                   href="/add-hostel"
//                   className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//                 >
//                   <Plus className="w-5 h-5 mr-2" />
//                   Add New Hostel
//                 </a>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {hostels.map((hostel) => (
//                   <div key={hostel._id} className="bg-white rounded-lg shadow-md p-6">
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">{hostel.name}</h3>
//                     <div className="flex items-center text-gray-600 mb-4">
//                       <MapPin className="w-4 h-4 mr-1" />
//                       <span className="text-sm">{hostel.location}, {hostel.city}</span>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <p className="text-sm text-gray-600">Price</p>
//                         <p className="text-lg font-semibold text-blue-600">₹{hostel.price.toLocaleString()}/month</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-600">Available Rooms</p>
//                         <p className="text-lg font-semibold text-gray-900">{hostel.rooms.available}/{hostel.rooms.total}</p>
//                       </div>
//                     </div>

//                     <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
//                       Edit Hostel
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === 'profile' && (
//           <div>
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
//               <p className="text-gray-600">Your business details</p>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
//                   <p className="text-gray-900">{owner.ownerName}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
//                   <p className="text-gray-900">{owner.businessName}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <p className="text-gray-900">{owner.email}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                   <p className="text-gray-900">{owner.phone}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                   <p className="text-gray-900">{owner.city}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                   <p className="text-gray-900">{owner.address}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }