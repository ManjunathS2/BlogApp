import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

function Navbar() {
  const [show, setShow] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
         
          <div className="text-2xl font-bold text-gray-800">
            <Link to="/">
              Blog<span className="text-blue-600">App</span>
            </Link>
          </div>


          <div className="hidden md:flex">
            <ul className="flex space-x-8 text-gray-600 font-medium">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="hover:text-blue-600 transition duration-200"
                >
                  BLOGS
                </Link>
              </li>
              <li>
                <Link
                  to="/creators"
                  className="hover:text-blue-600 transition duration-200"
                >
                  CREATORS
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 transition duration-200"
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition duration-200"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

   
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-sm"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 shadow-sm"
            >
              Login
            </Link>
          </div>

          <div
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {show ? <IoCloseOutline /> : <FiMenu />}
          </div>
        </div>

        {/* for mobile */}
        {show && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <ul className="flex flex-col space-y-4 p-4 text-gray-600 font-medium">
              <li>
                <Link
                  to="/"
                  onClick={() => setShow(false)}
                  className="block hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  onClick={() => setShow(false)}
                  className="block hover:text-blue-600"
                >
                  BLOGS
                </Link>
              </li>
              <li>
                <Link
                  to="/creators"
                  onClick={() => setShow(false)}
                  className="block hover:text-blue-600"
                >
                  CREATORS
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => setShow(false)}
                  className="block hover:text-blue-600"
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={() => setShow(false)}
                  className="block hover:text-blue-600"
                >
                  CONTACT
                </Link>
              </li>

              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  to="/dashboard"
                  onClick={() => setShow(false)}
                  className="bg-blue-600 text-white text-center px-4 py-2 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  to="/login"
                  onClick={() => setShow(false)}
                  className="bg-red-500 text-white text-center px-4 py-2 rounded-md"
                >
                  Login
                </Link>
              </div>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
