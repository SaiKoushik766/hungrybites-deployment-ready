import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-darkBg/60 via-darkBg/80 to-darkBg z-10" />
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Restaurant Header" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="z-10 text-center px-4 max-w-4xl pt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white"
          >
            Taste the <span className="text-primaryOrange">Extraordinary</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Experience premium dining with dishes crafted to perfection. Delivered hot to your door or enjoyed at our elegant venue.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              to="/menu" 
              className="inline-flex items-center space-x-3 bg-primaryOrange hover:bg-primaryOrangeHover text-white font-bold text-lg px-8 py-4 rounded-full transition transform hover:scale-105 shadow-xl shadow-primaryOrange/20"
            >
              <span>Explore Menu</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-primaryOrange">Specials</span></h2>
          <p className="text-gray-400">Hand-picked favorites by our head chef</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Spicy Fire Burger', price: '$12.99', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60' },
            { name: 'Truffle Pasta', price: '$18.50', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=60' },
            { name: 'Sushi Platter', price: '$24.00', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=60' },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-darkCard rounded-2xl overflow-hidden shadow-lg border border-darkBorder group"
            >
              <div className="h-56 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="text-primaryOrange font-bold">{item.price}</span>
                </div>
                <Link to="/menu" className="block text-center w-full py-2.5 border border-primaryOrange text-primaryOrange hover:bg-primaryOrange hover:text-white rounded-lg transition font-semibold">
                  Order Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
