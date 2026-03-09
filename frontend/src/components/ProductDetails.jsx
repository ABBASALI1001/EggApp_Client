// src/components/ProductDetails.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaWhatsapp, FaMinus, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { defaultProducts } from "../seedData";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Find the product from seedData based on the ID from URL
  const product = defaultProducts.find((p) => p.id === parseInt(id));

  // If product not found, show error message
  if (!product) {
    return (
      <div className="container-custom py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products" className="btn-primary inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`${quantity} dozen ${product.name} added to cart!`);
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in ${product.name} (₹${product.price}/dozen). I'd like to order ${quantity} dozen. Is it available for delivery?`;
    window.open(
      `https://wa.me/919347079348?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-4">
        <Link to="/products" className="text-primary hover:underline">
          ← Back to Products
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold text-lg">
                🔜 COMING SOON
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <span className="text-sm text-primary font-semibold capitalize">
            {product.category} Eggs
          </span>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-primary">
              ₹{Math.round(product.price)}
            </span>
            <span className="text-gray-500">/dozen</span>
          </div>

          <div className="mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.inStock ? "In Stock" : "Coming Soon"}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Quantity (dozen)</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border rounded hover:bg-gray-100"
                disabled={!product.inStock}
              >
                <FaMinus />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border rounded hover:bg-gray-100"
                disabled={!product.inStock}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {product.inStock ? "Add to Cart" : "Coming Soon"}
            </button>
            <button
              onClick={handleWhatsAppInquiry}
              disabled={!product.inStock}
              className="flex-1 btn-whatsapp disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FaWhatsapp />
              {product.inStock ? "Buy on WhatsApp" : "Not Available"}
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Free delivery within 24 hours. Cash on delivery available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
