import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Category from "./pages/Category";
import Contact from "./pages/Contact";
import OrderSuccess from "./pages/OrderSuccess"; // ✅ Import OrderSuccess

const App = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order-success" element={<OrderSuccess />} /> {/* ✅ New route */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
