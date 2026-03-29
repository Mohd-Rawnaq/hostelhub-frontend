import React from 'react'
import { Shield, Wifi, Users, Utensils } from 'lucide-react'

const WhyChooseUs = () => {
    return (
        <div>
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
        </div>
    )
}

export default WhyChooseUs