import React from 'react'
import HostelHomepage from './components/HostelHomePage'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import QuickStats from './components/QuickStats'
import FeaturedHostels from './components/FeaturedHostels'
import WhyChooseUs from './components/WhyChooseUs'
import Footer from './components/Footer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StudentSignup from './pages/StudentSignup'
import LoginPage from './pages/LoginPage'
import OwnerSignup from './pages/OwnerSignup'
import AddHostel from './pages/AddHostel'
import HostelListing from './pages/HostelListing'
import HostelDetail from './pages/HostelDetail'
import StudentDashboard from './pages/StudentDashboard'
import OwnerDashboard from './pages/OwnerDashboard'
import Homepage from './components/Homepage'

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <Homepage />
      </>
    },
    {
      path: '/studentsignup',
      element: <><StudentSignup /></>
    },
    {
      path: '/login',
      element: <><LoginPage /></>
    },
    {
      path: '/ownersignup',
      element: <><OwnerSignup /></>
    },
    {
      path: '/add-hostel',
      element: <><AddHostel /></>
    },
    {
      path: '/list-hostels',
      element: <><HostelListing /></>
    },
    {
      path: '/hostel/:id',
      element: <><HostelDetail /></>
    },
    {
      path: '/student-dashboard',
      element: <><StudentDashboard /></>
    },
    {
      path: '/owner-dashboard',
      element: <><OwnerDashboard /></>
    }
    // { You have to pass hostel ID as a param to fetch details of that specific hostel
    // Yeh hostel detail page load nai hora, isku dekhlena agli baar khole jab
    //   path: '/hostel-detail',
    //   element: <><HostelDetail /></>
    // }
  ]);

  return (
    <div>
      {/* <HostelHomepage /> */}
      {/* <Navbar />
      <HeroSection />
      <QuickStats />
      <FeaturedHostels />
      <WhyChooseUs />
      <Footer /> */}
      <RouterProvider router={router} />
    </div>
  )
}

export default App