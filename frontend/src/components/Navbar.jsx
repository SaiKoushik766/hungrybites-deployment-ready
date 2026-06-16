import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import  {AuthContext} from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-darkBg/90 backdrop-blur-md fixed w-full z-50 top-0 border-b border-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center text-primaryOrange font-bold text-2xl font-sans tracking-wide">
              Hungry<span className="text-white ml-1">Bites</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-primaryOrange transition">Home</Link>
              <Link to="/menu" className="text-gray-300 hover:text-primaryOrange transition">Menu</Link>
              
              {user ? (
                <>
                  <Link to="/my-orders" className="text-gray-300 hover:text-primaryOrange transition">My Orders</Link>
                  <Link to="/rewards" className="text-gray-300 hover:text-primaryOrange transition">Rewards</Link>
                  {isAdmin && <Link to="/admin" className="text-primaryOrange hover:text-primaryOrangeHover font-semibold transition">Admin</Link>}
                  
                  <div className="relative group flex items-center space-x-2 border-l border-darkBorder pl-4 ml-2">
                    <FaUserCircle className="text-2xl text-gray-400 group-hover:text-white transition" />
                    <span className="text-gray-300 font-medium">{user.username}</span>
                    <button onClick={logout} className="ml-4 text-xs font-semibold bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-3 py-1.5 rounded transition">Logout</button>
                  </div>
                </>
              ) : (
                <button onClick={() => setIsAuthModalOpen(true)} className="text-gray-300 hover:text-white transition font-medium">Login / Register</button>
              )}

              <Link to="/cart" className="relative text-gray-300 hover:text-primaryOrange transition group">
                <FaShoppingCart className="text-2xl group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primaryOrange text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <Link to="/cart" className="relative text-gray-300">
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primaryOrange text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button className="text-gray-300 text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-darkCard border-b border-darkBorder shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-300 hover:bg-darkBorder rounded" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/menu" className="block px-3 py-2 text-gray-300 hover:bg-darkBorder rounded" onClick={() => setIsMenuOpen(false)}>Menu</Link>
              
              {user ? (
                <>
                  <Link to="/my-orders" className="block px-3 py-2 text-gray-300 hover:bg-darkBorder rounded" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                  <Link to="/rewards" className="block px-3 py-2 text-gray-300 hover:bg-darkBorder rounded" onClick={() => setIsMenuOpen(false)}>Rewards</Link>
                  {isAdmin && <Link to="/admin" className="block px-3 py-2 text-primaryOrange font-semibold rounded" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>}
                  <div className="px-3 py-3 border-t border-darkBorder mt-2 flex justify-between items-center bg-darkBg/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                       <FaUserCircle className="text-xl text-gray-400" />
                       <span className="text-gray-300 font-medium">{user.username}</span>
                    </div>
                    <button onClick={() => { logout(); setIsMenuOpen(false) }} className="text-xs font-semibold bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-3 py-1.5 rounded transition">Logout</button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false) }} 
                  className="block w-full text-left px-3 py-3 mt-2 rounded bg-primaryOrange/10 text-primaryOrange hover:bg-primaryOrange hover:text-white font-semibold transition"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      
      {/* Auth Modal Slide/Overlay */}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </>
  );
};

export default Navbar;
