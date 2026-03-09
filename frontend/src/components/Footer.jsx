// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLeaf,
  FaEgg,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 mt-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container-custom py-16 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info - Enhanced */}
          <div className="space-y-5 group">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <FaEgg className="text-primary text-2xl" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EggSupply
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Bringing the freshest, naturally-sourced village eggs directly to
              urban kitchens.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://wa.me/919347079348"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-all transform hover:scale-110 hover:rotate-12 shadow-lg"
              >
                <FaWhatsapp className="text-xl" />
              </a>
              <a
                href="mailto:villageknocks@gmail.com"
                className="bg-primary p-3 rounded-xl hover:bg-yellow-500 transition-all transform hover:scale-110 hover:-rotate-12 shadow-lg"
              >
                <FaEnvelope className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-secondary p-3 rounded-xl hover:bg-green-700 transition-all transform hover:scale-110 shadow-lg"
              >
                <FaLeaf className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links - Enhanced */}
          <div className="space-y-5">
            <h4 className="text-xl font-bold text-gray-800 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", text: "Home" },
                { to: "/products", text: "Our Products" },
                { to: "/about", text: "About Our Farms" },
                { to: "/contact", text: "Contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-2 transition-transform">
                      {link.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Enhanced */}
          <div className="space-y-5">
            <h4 className="text-xl font-bold text-gray-800 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600 group">
                <div className="bg-primary/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <span className="font-medium">villageknocks@gmail.com</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-600 group">
                <div className="bg-secondary/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <FaPhone className="text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <span className="font-medium">+91 93470 79348</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-600 group">
                <div className="bg-yellow-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <FaMapMarkerAlt className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Address</p>
                  <span className="font-medium">
                    Moula Ali, Hyderabad, Telangana
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Delivery Areas - Enhanced */}
          <div className="space-y-5">
            <h4 className="text-xl font-bold text-gray-800 relative inline-block">
              Delivery Areas
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h4>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl">
              <ul className="space-y-3">
                {["Moula Ali", "Secundrabad", "Uppal"].map((area, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-600 group"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="group-hover:text-primary transition-colors">
                      {area}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-primary font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Free delivery in these areas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="border-t-2 border-gray-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} EggSupply since 2024
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-500 hover:text-primary transition-colors relative group"
              >
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                to="/terms"
                className="text-gray-500 hover:text-primary transition-colors relative group"
              >
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
