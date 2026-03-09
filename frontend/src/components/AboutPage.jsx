// src/components/AboutPage.jsx
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaHandsHelping,
  FaTruck,
  FaLeaf,
  FaEgg,
  FaStar,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-r from-secondary to-green-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🥚</div>
          <div className="absolute bottom-10 right-10 text-8xl">🐔</div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Our Story
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-beige">
            Bringing the freshest village eggs to urban homes since 2024
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/products"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all transform hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <FaHeart className="text-primary" />
                <span className="font-semibold">Our Purpose</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800">
                Our <span className="text-primary">Mission</span>
              </h2>
              <div className="w-20 h-1 bg-primary"></div>
              <p className="text-gray-600 text-lg leading-relaxed">
                At EggSupply, we believe that everyone deserves access to fresh,
                nutritious eggs from happy, healthy hens. We connect urban
                families directly with village farmers who practice traditional,
                natural farming methods.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                By eliminating middlemen, we ensure farmers get fair prices and
                customers get the freshest eggs at reasonable rates.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaLeaf className="text-secondary" />
                  </div>
                  <span className="font-medium">100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaEgg className="text-secondary" />
                  </div>
                  <span className="font-medium">Farm Fresh</span>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://media.istockphoto.com/id/2182380136/photo/farmer-collecting-eggs-at-a-poultry-farm-and-carrying-cartons.webp?a=1&b=1&s=612x612&w=0&k=20&c=BYWfK-Am32guv3TxIMFoSS7UjSRBWvAWmqrWh27Ht1k="
                alt="Farm mission"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <p className="font-semibold text-secondary">Fresh Daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Farmers Section - Enhanced */}
      <section className="py-20 bg-beige">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://thumbs.dreamstime.com/b/collecting-organic-eggs-production-illustration-nest-box-chicken-sizes-colors-breeds-373904776.jpg?w=576"
                alt="Village farmer"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-primary/90 text-white px-4 py-2 rounded-lg shadow-lg">
                <p className="font-bold">50+ Farms</p>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full">
                <FaHandsHelping className="text-secondary" />
                <span className="font-semibold">Community Impact</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800">
                Supporting{" "}
                <span className="text-secondary">Village Farmers</span>
              </h2>
              <div className="w-20 h-1 bg-secondary"></div>
              <p className="text-gray-700 text-lg leading-relaxed">
                We work with over{" "}
                <span className="font-bold text-secondary">
                  50 small family farms
                </span>{" "}
                across rural areas. Each farm follows traditional free-range
                practices, allowing hens to roam freely and eat natural diets.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                This partnership creates sustainable livelihoods for farming
                communities while preserving traditional agricultural practices.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <span className="ml-2 text-gray-600">
                  Trusted by 1000+ families
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farm to Home Process - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4">
              How We Work
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Farm to Home <span className="text-primary">Process</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center p-8 card hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="relative inline-block">
                <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  1
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-gray-800">
                Early Morning Collection
              </h3>
              <p className="text-gray-600">
                Eggs are collected fresh at dawn from village farms, ensuring
                maximum freshness
              </p>
              <div className="mt-4 text-5xl opacity-20">🌅</div>
            </div>

            {/* Step 2 */}
            <div className="text-center p-8 card hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="relative inline-block">
                <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  2
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-gray-800">
                Quality Check & Packing
              </h3>
              <p className="text-gray-600">
                Each egg is carefully inspected and packed in eco-friendly trays
                by our team
              </p>
              <div className="mt-4 text-5xl opacity-20">📦</div>
            </div>

            {/* Step 3 */}
            <div className="text-center p-8 card hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="relative inline-block">
                <div className="bg-primary text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  3
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="font-bold text-2xl mb-3 text-gray-800">
                Direct Home Delivery
              </h3>
              <p className="text-gray-600">
                Delivered to your doorstep within 24 hours of collection, super
                fresh
              </p>
              <div className="mt-4 text-5xl opacity-20">🚚</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - NEW */}
      <section className="py-16 bg-secondary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-beige">Partner Farms</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p className="text-beige">Happy Families</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24h</div>
              <p className="text-beige">Farm to Home</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-beige">Natural Eggs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
