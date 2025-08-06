// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaDonate, FaSignInAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-[#1F1F1F] text-white min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-900 to-[#1F1F1F] -z-10"></div>

        <div className="text-center max-w-3xl z-10">
          <h1 className="text-5xl font-extrabold mb-4">
            🌱 Welcome to <span className="text-green-400">ShareCircle</span>
          </h1>
          <p className="text-xl mb-6">
            Bridging Kindness, One Donation at a Time 💚
          </p>
          <p className="text-gray-300 mb-8">
            ShareCircle connects donors with those in need — whether it's
            clothes, books, or food. Every donation builds a kinder community.
          </p>
          <Link to="/donate">
            <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold shadow-md transition">
              Start Donating
            </button>
          </Link>

          {/* Scroll Down Indicator */}
          {/* Scroll Down Indicator */}
          <div className="mt-20 flex flex-col items-center text-green-400 animate-bounce">
            <p className="text-2xl font-bold mb-2 tracking-wide">Scroll Down</p>
            <div className="text-4xl leading-snug"></div>
          </div>
        </div>
      </section>

      {/* Green line after Hero */}
      <div className="border-t border-green-900 w-full"></div>

      {/* About Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-green-400 mb-4">About Us</h2>
        <FaUsers className="text-green-400 text-4xl mx-auto mb-4" />
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          ShareCircle is a non-profit platform connecting generous individuals
          with those in need. Our mission is to eliminate waste and encourage a
          culture of giving.
        </p>
      </section>

      {/* Donate Section */}
      <section className="py-20 px-6 text-center border-t border-green-900">
        <h2 className="text-4xl font-bold text-green-400 mb-4">Donate Now</h2>
        <FaDonate className="text-green-400 text-4xl mx-auto mb-4" />
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Choose what you want to donate — clothes, books, food, or toys. Your
          kindness can change someone's life.
        </p>
        <Link to="/donate">
          <button className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-white font-medium shadow-md transition">
            Donate Now
          </button>
        </Link>
      </section>

      {/* Items Section */}
      <section className="py-20 px-6 text-center border-t border-green-900">
        <h2 className="text-4xl font-bold text-green-400 mb-4">
          Donation Items
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Discover items shared by others or post your own. Every small act of
          giving counts!
        </p>
        <Link to="/items">
          <button className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-white font-medium shadow-md transition">
            Buy Items
          </button>
        </Link>
      </section>

      {/* Login Section */}
      <section className="py-20 px-6 text-center border-t border-green-900">
        <h2 className="text-4xl font-bold text-green-400 mb-4">Login</h2>
        <FaSignInAlt className="text-green-400 text-4xl mx-auto mb-4" />
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Login to manage your donations, track history, and join a growing
          community of givers.
        </p>
        <Link to="/Login">
          <button className="mt-6 bg-green-700 hover:bg-green-800 px-6 py-3 rounded-full text-white font-medium shadow-md transition">
            Login
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
