import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ Added useLocation

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Detect route changes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ✅ Run on route change + mount to update login status
  useEffect(() => {
    const verifyLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const res = await fetch("https://unused-item-donation.onrender.com/api/auth/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      }
    };

    verifyLogin();
  }, [location]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-[#1F1F1F] text-[#E0F7D1] fixed top-0 left-0 w-full z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-2">
        <div className="text-2xl font-bold text-green-400 animate-pulse tracking-wide">
          <Link to="/">ShareCircle</Link>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li><Link to="/" className="hover:text-[#B6F09C]">Home</Link></li>
          <li><Link to="/donate" className="hover:text-[#B6F09C]">Donate</Link></li>
          <li><Link to="/items" className="hover:text-[#B6F09C]">Items</Link></li>
          <li><Link to="/about" className="hover:text-[#B6F09C]">About</Link></li>
          <li><Link to="/cart" className="hover:text-[#B6F09C]">Cart</Link></li>
          <li><Link to="/orders" className="hover:text-[#B6F09C]">Orders</Link></li>

          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-red-400 font-semibold hover:text-red-300 transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="text-green-400 text-lg font-semibold animate-pulse hover:text-[#B6F09C]"
              >
                Login / Sign In
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile menu toggle */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <svg className="w-6 h-6 text-[#E0F7D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1F1F1F] w-full px-8 pt-4 pb-6 space-y-4 font-medium text-[#E0F7D1]">
          <Link to="/" onClick={toggleMenu} className="block hover:text-[#B6F09C]">Home</Link>
          <Link to="/donate" onClick={toggleMenu} className="block hover:text-[#B6F09C]">Donate</Link>
          <Link to="/items" onClick={toggleMenu} className="block hover:text-[#B6F09C]">Items</Link>
          <Link to="/about" onClick={toggleMenu} className="block hover:text-[#B6F09C]">About</Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="block text-red-400 font-semibold hover:text-red-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block text-green-400 text-lg font-semibold animate-pulse hover:text-[#B6F09C]"
            >
              Login / Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
