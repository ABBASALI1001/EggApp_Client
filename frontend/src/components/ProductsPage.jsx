// src/components/ProductsPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "../contexts/CartContext";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "All Eggs" },
    { id: "country", name: "Country Eggs" },
    { id: "desi", name: "Desi Egg" },
    { id: "farm", name: "Farm Eggs" },
    { id: "tray", name: "Tray Packs" },
  ];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory)
      return false;
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;
    return true;
  });

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWhatsAppInquiry = (product) => {
    const message = `Hi! I'm interested in ${product.name} (₹${product.price}/dozen). Is it available?`;
    window.open(
      `https://wa.me/919347079348?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <div className="container-custom py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
        <p className="mt-2 text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="card p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="text-primary" />
              <h2 className="font-semibold text-lg">Filters</h2>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Egg Type</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={selectedCategory === cat.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-primary"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-medium mb-2">Price Range (₹)</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span>₹0</span>
                  <span>Up to ₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id || product.id} className="card group">
                <Link to={`/product/${product._id || product.id}`}>
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://images.pexels.com/photos/805469/pexels-photo-805469.jpeg";
                      }}
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded font-semibold">
                          🔜 Coming Soon
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                <Link to={`/product/${product._id || product.id}`}>
                  <h3 className="font-semibold text-lg hover:text-primary">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-primary">
                    ₹{Math.round(product.price)}
                  </span>
                  <span className="text-sm text-gray-500"></span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {product.inStock ? "Add to Cart" : "Coming Soon"}
                  </button>
                  <button
                    onClick={() => handleWhatsAppInquiry(product)}
                    disabled={!product.inStock}
                    className={`p-2 rounded ${
                      product.inStock
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-300 cursor-not-allowed text-gray-500"
                    }`}
                    title={
                      product.inStock ? "Ask on WhatsApp" : "Not Available"
                    }
                  >
                    <FaWhatsapp />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No products found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
