import React from 'react'
import { Home } from 'lucide-react'

const Footer = () => {
    return (
        <div>
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
    )
}

export default Footer