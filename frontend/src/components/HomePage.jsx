// src/components/HomePage.jsx
import { Link } from "react-router-dom";
import {
  FaTruck,
  FaLeaf,
  FaClock,
  FaStar,
  FaWhatsapp,
  FaEgg,
  FaCheckCircle,
} from "react-icons/fa";

const HomePage = () => {
  const testimonials = [
    {
      name: " J.Sampath",
      text: "The difference in taste is incredible. You can really tell these are from a village farm.",
      rating: 5,
    },
    {
      name: "Shiva Raj",
      text: "I love that I'm supporting local village farmers. The subscription service is so convenient.",
      rating: 5,
    },
    {
      name: "Abdul Khadir",
      text: "Fast delivery and very careful packaging. Not a single egg has ever been broken.",
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-r from-beige to-white py-20 md:py-28 overflow-hidden">
        <div className="absolute top-20 right-20 text-8xl opacity-10 rotate-12">
          🥚
        </div>
        <div className="absolute bottom-20 left-20 text-8xl opacity-10">🐔</div>
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <FaEgg className="text-primary" />
                <span className="font-semibold">100% Organic • Farm Fresh</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Fresh Village <br />
                <span className="text-primary relative">
                  Eggs Delivered
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"></span>
                </span>
                <br />
                to Your Home
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Directly sourced from rural farms and delivered fresh every day.
                Taste the difference of naturally raised poultry.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/products" className="btn-primary text-lg px-8 py-4">
                  Order Eggs Now →
                </Link>
                <Link
                  to="/products"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  View Products
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-gray-600">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-gray-600">24h Service</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1639194335563-d56b83f0060c?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Fresh eggs in basket"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
                <p className="font-bold text-primary text-lg">Fresh Daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Enhanced */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-8 card hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="bg-green-100 p-4 rounded-full">
                <FaLeaf className="text-4xl text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Farm Fresh</h3>
                <p className="text-gray-600">Natural Village Eggs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-8 card hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="bg-yellow-100 p-4 rounded-full">
                <FaClock className="text-4xl text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Daily Collection</h3>
                <p className="text-gray-600">Straight from fields</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-8 card hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="bg-green-100 p-4 rounded-full">
                <FaTruck className="text-4xl text-secondary" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Fast Delivery</h3>
                <p className="text-gray-600">Within 24 Hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className="py-20 bg-beige">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "Farm Collection",
                desc: "Local village farmers collect fresh eggs early every morning from naturally fed hens.",
                icon: "🌅",
              },
              {
                num: "2",
                title: "Quality Check",
                desc: "Each egg is carefully inspected, cleaned naturally, and packed in eco-friendly trays.",
                icon: "✅",
              },
              {
                num: "3",
                title: "Doorstep Delivery",
                desc: "Our team delivers the tray directly to your home in urban areas within 24 hours.",
                icon: "🏠",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center p-8 card hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="relative inline-block">
                  <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                    {step.num}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm animate-pulse">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm Guarantee - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-secondary to-green-800 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                <FaCheckCircle />
                <span className="font-semibold">Our Promise to You</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Our Farm Fresh <br />
                <span className="text-primary">Guarantee</span>
              </h2>
              <p className="text-xl text-beige">
                We believe that the best food comes from nature, not factories.
                Our hens roam freely in open fields, feeding on natural grains
                and insects.
              </p>
              <ul className="space-y-4">
                {[
                  "No artificial growth hormones or antibiotics",
                  "Naturally dark orange yolks rich in nutrients",
                  "Collected and packed within 12 hours",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-primary text-xl flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-block bg-green-400 text-secondary px-8 py-4 rounded-lg font-bold text-lg hover:bg-beige transition-all transform hover:scale-105 shadow-lg"
              >
                Learn About Our Sourcing →
              </Link>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1563409236340-c174b51cbb81?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Free range hens"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-2xl font-bold">Happy & Healthy Hens</p>
                <p className="text-beige">Free-range farming since 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4">
              Customer Love
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What Our <span className="text-primary">Customers Say</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="flex text-primary mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-2xl" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner - Enhanced */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Order Fresh Village Eggs Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start your day with nutrition and taste. We deliver every morning
            from 6 AM to 10 AM.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/products"
              className="bg-green-700 text-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Order Your 1st Tray
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition-all transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919347079348?text=Hi! I'm interested in fresh eggs 🥚"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110 z-50 hover:shadow-2xl"
      >
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};

export default HomePage;
