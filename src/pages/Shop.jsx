import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2021/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err.message);
        setLoading(false);
      });
  }, []);

  const selectedProduct = id ? products.find((p) => String(p.id) === id) : null;

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...existingCart, product]));
    alert("Product added to cart!");
  };

  if (loading) return <p className="text-center mt-16">Loading...</p>;

  return (
    <div className="p-6 mt-16 max-w-7xl mx-auto">
      {selectedProduct ? (
        // ---------- SINGLE PRODUCT PAGE ----------
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Images */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 items-center">
            <img
              src={selectedProduct.imageUrl || "https://via.placeholder.com/300"}
              alt={selectedProduct.title}
              className="w-full max-w-lg h-[400px] object-contain rounded-xl shadow"
            />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={selectedProduct.imageUrl || "https://via.placeholder.com/80"}
                  className="w-20 h-20 object-contain border p-1 rounded-md"
                />
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {selectedProduct.title}
            </h1>
            <p className="text-sm text-gray-600">
              Brand: <span className="font-medium text-black">Generic</span>
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-2 text-yellow-500 text-sm">
              ⭐⭐⭐⭐☆ <span className="text-gray-500">(123 ratings)</span>
            </div>

            {/* Price */}
            <p className="text-4xl font-bold text-green-600">
              ₹{selectedProduct.price}
            </p>
            <p className="text-sm text-gray-500">Inclusive of all taxes</p>

            {/* Offers */}
            <div className="border rounded-lg p-4 bg-orange-50 text-sm">
              <p className="font-semibold text-orange-700 mb-2">Save Extra with 2 Offers</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Cashback: Get 5% with select cards</li>
                <li>Buy 2 Get Extra 5% Off</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => alert("Proceed to buy")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold transition"
              >
                Buy Now
              </button>
            </div>

            {/* Back */}
            <button
              className="mt-6 text-blue-600 underline"
              onClick={() => navigate("/shop")}
            >
              ← Back to Shop
            </button>
          </div>
        </div>
      ) : (
        // ---------- ALL PRODUCTS GRID ----------
        <>
          <h1 className="text-3xl font-bold mb-4">Shop Products</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/shop/${product.id}`)}
                className="border rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer bg-white"
              >
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="mt-2 font-semibold text-gray-800">{product.title}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-lg font-bold text-green-600 mt-1">
                  ₹{product.price}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
