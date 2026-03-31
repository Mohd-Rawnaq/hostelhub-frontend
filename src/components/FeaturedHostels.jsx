import React from 'react'
import { MapPin, Star } from 'lucide-react'
import { useState, useEffect } from 'react';
import API from '../utils/api';

const FeaturedHostels = () => {

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


    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Hostels</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hostels.map((hostel) => (
                        <div key={hostel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
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
                                        <span key={`${hostel.id}-${idx}`} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                            {amenity}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">{hostel.price}</div>
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
        </div>
    )
}

export default FeaturedHostels