
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from "./components/Home"
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {
  const location=useLocation()
  const hideNavbarAndFooter = ["/dashboard", "/register", "/login"].includes(
    location.pathname,
  );

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App
