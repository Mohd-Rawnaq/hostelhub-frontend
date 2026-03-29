import React, { useState } from 'react';
import { Home, User, Mail, Phone, Lock, Building2, MapPin, Eye, EyeOff } from 'lucide-react';
import API from '../utils/api';

export default function OwnerSignup() {
    const [formData, setFormData] = useState({
        ownerName: '',
        email: '',
        phone: '',
        businessName: '',
        address: '',
        city: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.ownerName.trim()) {
            newErrors.ownerName = 'Owner name is required';
        } else if (formData.ownerName.trim().length < 3) {
            newErrors.ownerName = 'Name must be at least 3 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Phone must be 10 digits';
        }

        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

   const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (validateForm()) {
    try {
      const response = await API.post('/owner/signup', {
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        address: formData.address,
        city: formData.city,
        password: formData.password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'owner');
      localStorage.setItem('user', JSON.stringify(response.data.owner));

      alert('Signup successful!');
      window.location.href = '/owner-dashboard';
    //   window.location.href = '/login'; // 1:33, 3/7/2026
      
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Network error. Please try again.');
      }
    }
  }
};

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Home className="w-8 h-8 text-blue-600" />
                            <span className="text-2xl font-bold text-gray-900">HostelHub</span>
                        </div>
                        <a href="/" className="text-gray-600 hover:text-blue-600">
                            Back to Home
                        </a>
                    </div>
                </div>
            </nav>

            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="max-w-2xl w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Register as Hostel Owner</h2>
                        <p className="text-gray-600">Join HostelHub and start managing your hostels</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-8">
                        <div className="space-y-5">
                            {/* Owner Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Owner Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="ownerName"
                                        value={formData.ownerName}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 border ${errors.ownerName ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
                            </div>

                            {/* Two columns for Email and Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="9876543210"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                            </div>

                            {/* Business Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Business/Hostel Name
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 border ${errors.businessName ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="e.g., Green Valley Hostels"
                                    />
                                </div>
                                {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Business Address
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Street address"
                                    />
                                </div>
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="e.g., Hyderabad"
                                    />
                                </div>
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>

                            {/* Two columns for passwords */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-12 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Create a password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-12 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                    I agree to the{' '}
                                    <a href="/terms" className="text-blue-600 hover:text-blue-700">
                                        Terms and Conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href="/privacy" className="text-blue-600 hover:text-blue-700">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Register as Hostel Owner
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm">
                                Already have an account?{' '}
                                <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Login here
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Looking for accommodation?{' '}
                            <a href="/student-signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                                Sign up as Student
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}