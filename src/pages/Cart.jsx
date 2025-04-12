import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = async () => {
    if (!userId || !token) {
      alert("Please log in to proceed with checkout.");
      localStorage.setItem("redirectAfterLogin", "/order-success");
      navigate("/profile"); // ✅ Corrected from /login to /profile
      return;
    }

    try {
      await sendCartToBackend(userId, token);
      alert("Checkout successful! Cart synced with backend.");
      localStorage.removeItem("cart");
      setCartItems([]);
      navigate("/order-success");
    } catch (error) {
      alert("Checkout failed.");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return <p className="text-center mt-16 text-xl">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-20 p-4">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="grid gap-6">
        {cartItems.map((item, i) => (
          <div
            key={i}
            className="flex gap-4 border rounded-xl p-4 bg-white shadow"
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/100"}
              alt={item.title}
              className="w-32 h-32 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-lg font-bold text-green-600 mt-2">
                ₹{item.price}
              </p>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity || 1}
              </p>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 mt-2 underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h2 className="text-2xl font-bold">Total: ₹{total.toFixed(2)}</h2>
        <button
          onClick={handleCheckout}
          className="mt-3 px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

// ✅ Function to sync cart with backend using Axios
const sendCartToBackend = async (userId, token) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  for (const item of cart) {
    const itemDTO = {
      productId: item.id,
      quantity: item.quantity || 1,
    };

    try {
      await axios.post("http://localhost:2021/api/cart/add", itemDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error syncing item:", itemDTO, error);
      throw error; // To stop further processing
    }
  }

  console.log("All cart items synced successfully.");
};

