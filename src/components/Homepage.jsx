import React, { useState } from 'react';
import { Search, MapPin, Wifi, Utensils, Shield, Star, Users, Home } from 'lucide-react';
import { useEffect } from 'react';
import API from '../utils/api';

export default function HostelHomepage() {
    const [searchLocation, setSearchLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');

    // Dummy featured hostels
    // const featuredHostels = [
    //     {
    //         id: 1,
    //         name: "Green Valley Hostel",
    //         location: "Near JNTU College",
    //         price: "₹5,000/month",
    //         image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500",
    //         rating: 4.5,
    //         amenities: ["WiFi", "Mess", "Laundry"],
    //         available: 5
    //     },
    //     {
    //         id: 2,
    //         name: "Student Paradise",
    //         location: "Kukatpally",
    //         price: "₹6,500/month",
    //         image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
    //         rating: 4.8,
    //         amenities: ["WiFi", "Gym", "AC Rooms"],
    //         available: 3
    //     },
    //     {
    //         id: 3,
    //         name: "Campus Heights",
    //         location: "Miyapur",
    //         price: "₹4,500/month",
    //         image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
    //         rating: 4.2,
    //         amenities: ["WiFi", "Mess", "Security"],
    //         available: 8
    //     }
    // ];

    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHostels();
    }, []);

    const fetchHostels = async () => {
        try {
            setLoading(true);
            const response = await API.get('/hostel');
            // Show only first 3 hostels on homepage
            setHostels(response.data.slice(0, 3));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching hostels:', error);
            setLoading(false);
        }
    };

    const handleSearch = () => {
        // Redirect to hostel listing page with search params
        const params = new URLSearchParams();
        if (searchLocation) params.append('search', searchLocation);
        if (priceRange) params.append('price', priceRange);

        window.location.href = `/list-hostels?${params.toString()}`;
        // window.location.href = '/list-hostels';
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

                        {/* <div className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">Hostels</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
                        </div> */}

                        <div className="flex items-center space-x-4">
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                                Login
                            </button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-4">Find Your Perfect Hostel</h1>
                        <p className="text-xl mb-8 text-blue-100">
                            Comfortable, affordable, and safe hostels for students
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4 py-2">
                                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Location (e.g., Kukatpally, JNTU)"
                                        className="w-full outline-none text-gray-700"
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                    />
                                </div>

                                <select
                                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 outline-none"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                >
                                    <option value="">Price Range</option>
                                    <option value="0-5000">Under ₹5,000</option>
                                    <option value="5000-7000">₹5,000 - ₹7,000</option>
                                    <option value="7000+">Above ₹7,000</option>
                                </select>

                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                                >
                                    <Search className="w-5 h-5 mr-2" />
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex justify-center gap-4">
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 shadow-lg">
                                Sign Up as Student
                            </button>
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 shadow-lg">
                                Register as Hostel Owner
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
                        <div className="text-gray-600">Available Rooms</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                        <div className="text-gray-600">Verified Hostels</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                        <div className="text-gray-600">Happy Students</div>
                    </div>
                </div>
            </div>

            {/* Featured Hostels */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Hostels</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hostels.map((hostel) => (
                        <div key={hostel._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                            <img
                                src={hostel.image}
                                alt={hostel.name}
                                className="w-full h-48 object-cover"
                            />
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
                                    <span className="text-sm">{hostel.location}</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {hostel.amenities.map((amenity, idx) => (
                                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                            {amenity}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">{hostel.price} rs</div>
                                        <div className="text-xs text-gray-500">{hostel.available} rooms available</div>
                                    </div>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold">
                        View All Hostels
                    </button>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose HostelHub?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Verified Hostels</h3>
                            <p className="text-gray-600 text-sm">All hostels are verified for safety and quality</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Wifi className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Modern Amenities</h3>
                            <p className="text-gray-600 text-sm">WiFi, mess, laundry and more facilities</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Student Community</h3>
                            <p className="text-gray-600 text-sm">Connect with fellow students and roommates</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Utensils className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Food & Mess</h3>
                            <p className="text-gray-600 text-sm">Quality meals and flexible mess options</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Home className="w-6 h-6" />
                                <span className="text-xl font-bold">HostelHub</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Your trusted platform for finding the perfect student accommodation.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">FAQs</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">For Hostel Owners</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white">List Your Hostel</a></li>
                                <li><a href="#" className="hover:text-white">Owner Login</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Contact Us</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>Email: support@hostelhub.com</li>
                                <li>Phone: +91 9876543210</li>
                                <li>Address: Hyderabad, India</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        © 2026 HostelHub. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}