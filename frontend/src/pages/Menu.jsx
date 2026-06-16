import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'non veg'];

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get('/food/get');
        setFoods(res.data.foods);
      } catch (err) {
        console.warn("API failed `/foods`, using mock data instead.");
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = category === 'All' ? foods : foods.filter(f => f.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our <span className="text-primaryOrange">Menu</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Explore a variety of carefully crafted dishes, made with fresh ingredients and passion.</p>
      </div>

      {/* Categories filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium transition duration-300 ${category === cat ? 'bg-primaryOrange text-white shadow-lg shadow-primaryOrange/30' : 'bg-darkCard text-gray-300 hover:bg-darkBorder border border-darkBorder hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 text-lg">Loading deliciousness...</div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredFoods.map(food => (
              <motion.div
                key={food._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-darkCard rounded-2xl overflow-hidden shadow-lg border border-darkBorder flex flex-col group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-3 right-3 bg-darkBg/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-primaryOrange font-bold border border-primaryOrange/20 shadow-xl">
                    {food.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white line-clamp-1">{food.name}</h3>
                    <span className="text-primaryOrange font-bold whitespace-nowrap ml-2">  {Number(food.price).toLocaleString('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                    })}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">{food.description}</p>
                  <button
                    onClick={() => {
                      addToCart(food);
                      // Optional: maybe add a small toast notification wrapper if needed later.
                    }}
                    className="w-full bg-darkBg border border-primaryOrange/50 text-white hover:bg-primaryOrange hover:border-primaryOrange font-semibold py-2.5 rounded-xl transition-all duration-300 active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredFoods.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-400">No items found in this category.</div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Menu;
