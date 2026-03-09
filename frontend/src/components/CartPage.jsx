// src/components/CartPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTrash,
  FaWhatsapp,
  FaPlus,
  FaMinus,
  FaShoppingBag,
} from "react-icons/fa";
import { generateWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const total = getCartTotal();

  const handleWhatsAppOrder = () => {
    if (!address || !phone) {
      toast.error("Please fill in address and phone number");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const message = generateWhatsAppMessage(cart, address, phone, total);
    openWhatsApp(message, "918797540042");
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-soft">
          <FaShoppingBag className="text-8xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-xl mb-6">Your cart is empty</p>
          <Link to="/products" className="btn-primary inline-block px-8 py-3">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-soft p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-gray-800 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-primary font-semibold text-lg">
                        ₹{item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.success("Item removed from cart");
                      }}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        <FaMinus size={14} />
                      </button>
                      <span className="w-12 text-center font-semibold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        <FaPlus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-xl text-primary">
                      ₹{item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 pb-4 border-b">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-600"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      ₹{item.subtotal.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Full Address *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mb-3"
              >
                <FaWhatsapp size={24} />
                Order via WhatsApp
              </button>

              <p className="text-xs text-gray-500 text-center">
                By placing this order, you agree to our terms and conditions.
                Our team will confirm your order via WhatsApp within 30 minutes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
