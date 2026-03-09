// src/utils/whatsapp.js
export const generateWhatsAppMessage = (cart, address, phone, total) => {
  const itemsList = cart.map(item =>
    `🥚 ${item.name} x${item.quantity} - $${item.subtotal}`
  ).join('\n');

  const message = `Hi EggSupply! I want to order:

${itemsList}

📍 *Delivery Address:*
${address}

📞 *Phone:* ${phone}

💰 *Total:* $${total}

Please confirm delivery time. Thanks! 🥚`;

  return encodeURIComponent(message);
};

export const openWhatsApp = (message, phoneNumber) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};