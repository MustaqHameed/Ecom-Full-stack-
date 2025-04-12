import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="border rounded-xl shadow p-4 hover:shadow-lg transition"
        >
          <img
            src={product.imageUrl || "https://via.placeholder.com/150"}
            alt={product.title}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="mt-2 font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="text-lg font-bold text-green-600">₹{product.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
