import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <h2 className="font-bold text-lg mb-2">Customer Service</h2>
          <ul>
            <li>Help Center</li>
            <li>Returns</li>
            <li>Shipping</li>
            <li>Track Orders</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">Company</h2>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">Policies</h2>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Refund Policy</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <p className="text-center mt-4">&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
