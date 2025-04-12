import { useParams } from "react-router-dom";

const Category = () => {
  const { name } = useParams();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{name.replace("-", " ")}</h1>
      <p className="text-gray-700">Explore the best products in {name} category.</p>
      {/* Add product list here */}
    </div>
  );
};

export default Category;
