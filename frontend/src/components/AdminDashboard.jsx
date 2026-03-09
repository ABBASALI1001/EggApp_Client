// src/components/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

   
     
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/products`,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        toast.error("Session expired. Please login again");
        navigate("/admin/login");
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Transform backend data to match frontend format
        const transformedProducts = data.products.map((product) => ({
          id: product._id || product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          category: product.category,
          description: product.description,
          inStock: product.inStock,
        }));
        setProducts(transformedProducts);
      } else {
        toast.error(data.message || "Failed to load products");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/admin/products/${id}`,
        {
          method: "DELETE",
          headers: {
            "x-auth-token": token,
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");

        // Optional: Show message to refresh user page
        toast.success("Refresh products page to see changes", {
          icon: "🔄",
          duration: 3000,
        });
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error connecting to server");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleSave = async (productData) => {
    try {
      const token = localStorage.getItem("adminToken");
      const url = editingProduct
        ? `http://localhost:5000/api/admin/products/${editingProduct.id}`
        : "http://localhost:5000/api/admin/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        const savedProduct = {
          ...data.product,
          id: data.product._id || data.product.id,
          price: Number(data.product.price),
        };

        if (editingProduct) {
          setProducts(
            products.map((p) =>
              p.id === editingProduct.id ? savedProduct : p,
            ),
          );
          toast.success("Product updated successfully");
        } else {
          setProducts([...products, savedProduct]);
          toast.success("Product added successfully");
        }

        // Show refresh hint
        toast.success("Refresh products page to see changes", {
          icon: "🔄",
          duration: 3000,
        });

        setShowAddModal(false);
        setEditingProduct(null);
      } else {
        toast.error("Failed to save product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error connecting to server");
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowAddModal(true);
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
          >
            <FaPlus /> Add Product
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading products...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          // Category-based fallback images
                          const fallbacks = {
                            desi: "https://images.unsplash.com/photo-1635843125569-b7fb33d26fab?q=80&w=1170",
                            farm: "https://images.pexels.com/photos/163037/egg-shell-food-cute-163037.jpeg",
                            tray: "https://images.unsplash.com/photo-1648141499246-97a0eb56c2fd?q=80&w=735",
                            country:
                              "https://images.pexels.com/photos/805469/pexels-photo-805469.jpeg",
                          };
                          e.target.src =
                            fallbacks[product.category] || fallbacks.country;
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 capitalize">{product.category}</td>
                    <td className="px-6 py-4">₹{product.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-500 hover:text-blue-700 p-1"
                          title="Edit"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {showAddModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

// Product Modal Component
const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    category: product?.category || "country",
    description: product?.description || "",
    image:
      product?.image ||
      "https://images.pexels.com/photos/805469/pexels-photo-805469.jpeg",
    inStock: product?.inStock !== undefined ? product.inStock : true,
  });

  // Category-based image suggestions
  const getImageSuggestion = (category) => {
    const suggestions = {
      country:
        "https://images.pexels.com/photos/805469/pexels-photo-805469.jpeg",
      desi: "https://images.unsplash.com/photo-1635843125569-b7fb33d26fab?q=80&w=1170",
      farm: "https://images.pexels.com/photos/163037/egg-shell-food-cute-163037.jpeg",
      tray: "https://images.unsplash.com/photo-1648141499246-97a0eb56c2fd?q=80&w=735",
    };
    return suggestions[category] || suggestions.country;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Country Eggs"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Price (₹) *
            </label>
            <input
              type="number"
              step="1"
              placeholder="450"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => {
                const newCategory = e.target.value;
                setFormData({
                  ...formData,
                  category: newCategory,
                  // Suggest image based on category
                  image: getImageSuggestion(newCategory),
                });
              }}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
            >
              <option value="country">Country Eggs</option>
              <option value="desi">Desi Eggs</option>
              <option value="farm">Farm Eggs</option>
              <option value="tray">Tray Packs</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              placeholder="Describe the product..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
            />

            {/* Image Preview with Category Match */}
            {formData.image && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = getImageSuggestion(formData.category);
                  }}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.category === "desi"
                    ? "🌾 Desi Egg image"
                    : formData.category === "farm"
                      ? "🐔 Farm Egg image"
                      : formData.category === "tray"
                        ? "📦 Tray Pack image"
                        : "🥚 Country Egg image"}
                </p>
              </div>
            )}
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.inStock}
              onChange={(e) =>
                setFormData({ ...formData, inStock: e.target.checked })
              }
              className="w-4 h-4 text-orange-500 rounded"
            />
            <span className="text-sm font-medium">In Stock</span>
          </label>

          <div className="flex gap-2 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
