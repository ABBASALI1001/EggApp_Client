// src/components/ContactPage.jsx
import { useState } from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, loading: true });

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFormStatus({ submitted: true, loading: false });

      // Reset submitted status after 3 seconds
      setTimeout(() => {
        setFormStatus({ submitted: false, loading: false });
      }, 3000);
    }, 1500);
  };

  const handleWhatsApp = () => {
    const message = `Hi! I have a question about EggSupply.`;
    window.open(
      `https://wa.me/919347079348?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const contactInfo = [
    {
      icon: <FaWhatsapp className="text-3xl" />,
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      title: "WhatsApp",
      description: "Quickest way to reach us",
      value: "+91 93470 79348",
      link: "https://wa.me/919347079348",
      action: handleWhatsApp,
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      bgColor: "bg-red-300",
      hoverColor: "hover:bg-yellow-500",
      title: "Email",
      description: "Send us an email anytime",
      value: "villageknocks@gmail.com",
      link: "mailto:villageknocks@gmail.com",
    },
    {
      icon: <FaPhone className="text-3xl" />,
      bgColor: "bg-blue-300",
      hoverColor: "hover:bg-green-700",
      title: "Phone",
      description: "Mon-Sat, 8AM-8PM",
      value: "+91 93470 79348",
      link: "tel:+919347079348",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-beige/30 min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-r from-secondary to-green-800 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-bounce">
            📞
          </div>
          <div className="absolute bottom-10 right-10 text-8xl animate-bounce delay-300">
            💬
          </div>
          <div className="absolute top-1/2 left-1/4 text-6xl animate-pulse">
            ✉️
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>

        <div className="container-custom text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <FaStar className="text-yellow-300" />
            <span className="text-sm font-semibold">We're Here to Help</span>
            <FaStar className="text-yellow-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-beige max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Reach out with any questions or
            feedback. Our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Contact Info Cards */}
          <div className="space-y-6">
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Contact <span className="text-primary">Information</span>
              </h2>
              <p className="text-gray-600">
                Choose the way that's most convenient for you
              </p>
              <div className="w-20 h-1 bg-primary mt-4"></div>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative p-6 flex items-start gap-6">
                    {/* Icon with Glow Effect */}
                    <div className="relative">
                      <div
                        className={`${info.bgColor} p-5 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {info.icon}
                      </div>
                      {/* Pulsing Ring */}
                      <div
                        className={`absolute inset-0 ${info.bgColor} rounded-2xl opacity-30 group-hover:animate-ping`}
                      ></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-bold text-2xl mb-1 text-gray-800">
                        {info.title}
                      </h3>
                      <p className="text-gray-500 mb-3">{info.description}</p>
                      <a
                        href={info.link}
                        target={
                          info.title === "WhatsApp" ? "_blank" : undefined
                        }
                        rel={
                          info.title === "WhatsApp"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        onClick={
                          info.title === "WhatsApp" ? info.action : undefined
                        }
                        className={`inline-flex items-center gap-2 text-lg font-semibold ${info.title === "WhatsApp" ? "text-green-600" : info.title === "Email" ? "text-primary" : "text-secondary"} hover:underline group`}
                      >
                        {info.value}
                        <span className="transform group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </a>
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours Card - Enhanced */}
            <div className="mt-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary p-4 rounded-xl text-white">
                  <FaClock className="text-3xl" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-gray-800">
                    Business Hours
                  </h3>
                  <p className="text-gray-500">We're always here for you</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-gray-600 font-medium">
                    Monday - Friday
                  </span>
                  <span className="font-bold text-gray-800">
                    8:00 AM - 8:00 PM
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-gray-600 font-medium">Saturday</span>
                  <span className="font-bold text-gray-800">
                    8:00 AM - 8:00 PM
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-gray-600 font-medium">Sunday</span>
                  <span className="font-bold text-gray-800">
                    8:00 AM - 10:00 PM
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-6 flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-gray-600">Open now</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 flex items-center gap-1">
                  <FaCheckCircle className="text-green-500" />
                  Same day response
                </span>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 text-white p-5 rounded-xl font-semibold hover:bg-green-600 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <FaWhatsapp className="text-2xl" />
                <span>WhatsApp</span>
              </button>
              <a
                href="mailto:villageknocks@gmail.com"
                className="bg-red-300 text-white p-5 rounded-xl font-semibold hover:bg-yellow-500 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <FaEnvelope className="text-2xl" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <FaPaperPlane className="text-2xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-green-500">
                      Send Message 😍
                    </h2>
                  </div>
                  <p className="text-white/90 text-lg">
                    Fill out the form below and we'll get back to you within 24
                    hours
                  </p>
                </div>

                {/* Form Body */}
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter name"
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Your email"
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your number"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Tell us how we can help..."
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus.loading}
                      className="w-full bg-green-500 from-primary to-secondary text-white py-5 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                    >
                      {formStatus.loading ? (
                        <>
                          <div className="w-6 h-6 border-3 bg-red-700  border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : formStatus.submitted ? (
                        <>
                          <FaCheckCircle className="text-2xl " />
                          Sent Successfully!
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-black   group-hover:translate-x-1 transition-transform" />
                          <h3 className="text-black ">Send message</h3>
                        </>
                      )}
                    </button>

                    {/* Form Footer Note */}
                    <p className="text-sm text-gray-500 text-center mt-4">
                      By submitting this form, you agree to our privacy policy
                      and terms of service. We'll never share your information
                      with third parties.
                    </p>
                  </form>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 bg-white rounded-xl p-4 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaCheckCircle className="text-green-500 text-xl" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    24/7 Support Available
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <span className="ml-2 text-sm text-gray-500">(4.9)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
