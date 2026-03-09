// src/components/CheckoutPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // For our WhatsApp-based system, checkout is handled in cart
    navigate("/cart");
  }, [navigate]);

  return null;
};

export default CheckoutPage;
