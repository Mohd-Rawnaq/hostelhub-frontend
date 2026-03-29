import React from 'react'
import { MapPin, Search } from 'lucide-react'

const QuickStats = () => {
    return (
        <div>
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
        </div>
    )
}

export default QuickStats