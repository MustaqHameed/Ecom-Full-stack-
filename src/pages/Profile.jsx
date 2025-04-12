import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:2021/api/users/login", {
        email: formData.email,
        password: formData.password,
      });
  
      const data = response.data;
      console.log("✅ Parsed data:", data);
  
      if (!data || !data.token || !data.userId) {
        throw new Error("Invalid login response");
      }
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); // ✅ Store userId from response
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
  
      alert("Login Successful!");
  
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath); // ✅ Navigate to order-success
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login Failed. Please check your credentials.");
    }
  };
  
  
  

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:2021/api/users/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      alert("Signup Successful! Please log in.");
      setIsLogin(true);
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup Failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-full max-w-md h-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className={`flex w-[200%] transition-transform duration-500 ease-in-out ${isLogin ? "translate-x-0" : "-translate-x-1/2"}`}>
          {/* Login Form */}
          <div className="w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded mt-2">
              Login
            </button>
            <p
              className="mt-2 text-sm text-center cursor-pointer text-blue-600"
              onClick={() => setIsLogin(false)}
            >
              Don't have an account? Sign up
            </p>
          </div>

          {/* Signup Form */}
          <div className="w-1/2 flex-shrink-0 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full p-2 mb-2 border rounded"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button onClick={handleSignup} className="w-full bg-green-600 text-white p-2 rounded mt-2">
              Sign Up
            </button>
            <p
              className="mt-2 text-sm text-center cursor-pointer text-green-600"
              onClick={() => setIsLogin(true)}
            >
              Already have an account? Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
