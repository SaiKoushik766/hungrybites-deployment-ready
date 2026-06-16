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
            src="https://i.pinimg.com/originals/52/ff/40/52ff401df7f40fac0478f3dba0dace93.jpg" 
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
    </div>
  );
};

export default Home;
