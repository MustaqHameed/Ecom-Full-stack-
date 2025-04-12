import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";

const carouselImages = [slide1, slide2, slide3];

const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUsername(parsedUser.fullName || parsedUser.email || "User");
      } else {
        setUsername("User");
      }
    } catch (error) {
      console.error("Error reading user from localStorage:", error);
      setUsername("User");
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUsername("");
    navigate("/profile");
    window.location.reload(); // ✅ Ensures state update after logout
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-center my-6">Welcome to EcomApp</h1>
        {username && (
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Hello, {username}!</span>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <p className="text-lg text-center text-gray-600 mb-6">
        Find the best deals on all your favorite products!
      </p>

      {/* Carousel Section */}
      <Carousel showThumbs={false} autoPlay infiniteLoop className="rounded-lg overflow-hidden">
        {carouselImages.map((img, index) => (
          <div key={index} className="h-64 md:h-96 flex justify-center items-center">
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </Carousel>

      {/* Why Shop With Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="col-span-2">
          <h2 className="text-3xl font-semibold mb-4">Why Shop With Us?</h2>
          <p className="text-gray-700 mb-6">
            We provide high-quality products at the best prices, with fast shipping and excellent customer service.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </button>
        </div>

        {/* Categories Section */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Top Categories</h2>
          <ul className="space-y-2">
            <li className="hover:text-blue-600 cursor-pointer">Electronics</li>
            <li className="hover:text-blue-600 cursor-pointer">Fashion</li>
            <li className="hover:text-blue-600 cursor-pointer">Home & Kitchen</li>
            <li className="hover:text-blue-600 cursor-pointer">Sports & Outdoors</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
