import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaHome,
  FaPhone,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState(null);

  const topCategories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Sports & Outdoors",
  ];

  const filteredCategories = topCategories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const getUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData?.fullName) {
          setUserName(userData.fullName);
        } else {
          setUserName(null);
        }
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
        setUserName(null);
      }
    };

    getUserData();
    window.addEventListener("storage", getUserData);
    return () => window.removeEventListener("storage", getUserData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserName(null);
    navigate("/profile");
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      const categorySlug = encodeURIComponent(searchTerm.trim().toLowerCase());
      navigate(`/category/${categorySlug}`);
      setSearchTerm("");
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (category) => {
    const categorySlug = encodeURIComponent(category.toLowerCase());
    navigate(`/category/${categorySlug}`);
    setSearchTerm("");
    setShowDropdown(false);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <FaHome /> EcomApp
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative mt-2 sm:mt-0">
          <div className="flex items-center bg-white text-black rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search category..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-1 outline-none w-64"
            />
            <button
              type="submit"
              className="bg-blue-700 text-white px-3 py-2 hover:bg-blue-800"
            >
              <FaSearch />
            </button>
          </div>

          {/* Dropdown Suggestions */}
          {showDropdown && filteredCategories.length > 0 && (
            <ul className="absolute left-0 top-full bg-white text-black w-64 mt-1 border rounded-md shadow-md z-50">
              {filteredCategories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => handleSuggestionClick(cat)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Right Side Links */}
        <div className="flex gap-6 items-center mt-2 sm:mt-0">
          <Link to="/cart" className="flex items-center gap-2 hover:underline">
            <FaShoppingCart /> Cart
          </Link>
          <Link to="/contact" className="flex items-center gap-2 hover:underline">
            <FaPhone /> Contact
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:underline">
            <FaUser /> {userName || "Profile"}
          </Link>

          {userName && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
