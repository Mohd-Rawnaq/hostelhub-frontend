import React, { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import API from '../utils/api';
// import { useParams } from 'react-router-dom';
import params from 'react-router-dom';

const HeroSection = () => {
    const [searchLocation, setSearchLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const handleSearch = () => {
        // Redirect to hostel listing page with search params
        const params = new URLSearchParams();
        if (searchLocation) params.append('search', searchLocation);
        if (priceRange) params.append('price', priceRange);

        window.location.href = `/hostels?${params.toString()}`;
    };
    return (
        <div>
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
                                <Link to="/studentsignup">Sign Up as Student</Link>
                            </button>
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 shadow-lg">
                                <Link to="/ownersignup">Register as Hostel Owner</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection