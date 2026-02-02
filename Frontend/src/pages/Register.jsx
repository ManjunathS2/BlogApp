import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios";

function Register() {
  const navigateTo = useNavigate(); // Hook for redirection

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/register",
        formData,
        {
          withCredentials: true, // FIXED: was 'Credential'
          headers: {
            "Content-Type": "multipart/form-data", // FIXED: removed extra space
          },
        },
      );
      console.log(data);
      alert(data.message || "User registered successfully");

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");

      // Redirect user to login or home
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Please fill the required fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <form onSubmit={handleRegister}>
          <div className="text-center mb-4">
            <div className="text-xl font-bold text-gray-800">
              Blog<span className="text-blue-600">App</span>
            </div>
            <h1 className="text-lg font-semibold mt-1 text-gray-600">
              Register
            </h1>
          </div>

          <div className="space-y-3">
            {/* ... (Your Inputs for Role, Name, Email, Phone, Password, Education remain the same) ... */}
            <div>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="number"
                placeholder="Your Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Education */}
            <div>
              <select
                name="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Your Education</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="BBA">BBA</option>
              </select>
            </div>

         
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    Img
                  </div>
                )}
              </div>

              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-sm mt-2"
            >
              Register
            </button>

            <p className="text-center text-xs text-gray-600 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
