// OrderSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      localStorage.setItem("redirectAfterLogin", "/order-success");
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
      <p className="text-lg text-gray-700 mb-6">Your items will be delivered soon. Thank you for shopping with us!</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
