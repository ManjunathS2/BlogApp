import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

function Login() {
  const [email,setEmail]=useState("")
  const [role,setRole]=useState("")
  const [password,setPassword]=useState("")

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const { data } = await axios.post("http://localhost:4000/api/user/login",
        {email,password,role},{
          withCredentials:true,
          headers:{
            "Content-type":"application/json"
          }
        }
      );

alert(data.message)
setEmail("")
setPassword("")
setRole("")

    }catch(error){
      alert(error.response.data.message)

    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <div className="text-xl font-bold text-gray-800">
              Blog<span className="text-blue-600">App</span>
            </div>
            <h1 className="text-lg font-semibold mt-1 text-gray-600">Login</h1>
          </div>

          <div className="space-y-3">
            <div>
              <select
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-sm mt-2">
              Login
            </button>

            <p className="text-center text-xs text-gray-600 mt-2">
              New here?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
