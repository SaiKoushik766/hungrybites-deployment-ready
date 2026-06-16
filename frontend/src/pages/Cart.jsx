import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8 max-w-md">Looks like you haven't added any delicious items to your cart yet.</p>
        <Link to="/menu" className="bg-primaryOrange hover:bg-primaryOrangeHover text-white px-8 py-3 rounded-full font-bold transition shadow-lg">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Your <span className="text-primaryOrange">Cart</span></h1>
      
      <div className="bg-darkCard rounded-2xl p-6 border border-darkBorder shadow-lg">
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between border-b border-darkBorder pb-6 last:border-0 last:pb-0">
              <div className="flex items-center space-x-4 w-full sm:w-1/2 mb-4 sm:mb-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-darkBorder" />
                <div>
                  <h3 className="font-bold text-lg text-white">{item.name}</h3>
                  <p className="text-gray-400 text-sm">{item.category}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full sm:w-1/2">
                <div className="flex items-center space-x-3 bg-darkBg border border-darkBorder rounded-lg px-2 py-1">
                  <button onClick={() => updateQuantity(item._id, -1)} className="p-1 hover:text-primaryOrange transition">
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="font-semibold w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 1)} className="p-1 hover:text-primaryOrange transition">
                    <FaPlus className="text-sm" />
                  </button>
                </div>
                
                <span className="font-bold text-lg text-white w-20 text-right">
                 ₹{Number(item.price * item.quantity).toFixed(2)}
                </span>
                
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-white p-2 transition ml-4 bg-red-500/10 rounded-lg hover:bg-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 border-t border-darkBorder pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-right w-full md:w-auto mb-6 md:mb-0">
            <span className="text-gray-400 mr-4">Total Amount:</span>
            <span className="text-3xl font-bold text-primaryOrange">₹{Number(cartTotal).toFixed(2)}</span>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full md:w-auto bg-primaryOrange hover:bg-primaryOrangeHover text-white px-10 py-4 rounded-xl font-bold text-lg transition transform hover:scale-[1.02] shadow-xl"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
