import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState('Home Delivery');
  const [tableNumber, setTableNumber] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [useReward, setUseReward] = useState(false);
  const [rewardAvailable, setRewardAvailable] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get('/user/profile');
      setRewardAvailable(res.data.user.rewardavailable);
      console.log("Reward availability:", res.data.user.rewardavailable);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to place an order");
      return;
    }

    if (orderType === 'Dine-In' && !tableNumber) {
      alert("Please enter a table number");
      return;
    }

    if (orderType === 'Home Delivery' && !address) {
      alert("Please enter a delivery address");
      return;
    }
    if (orderType === 'Home Delivery' && !mobilenumber) {
      alert("Please enter mobile number");
      return;
    }

    setLoading(true);

    // const orderData = {
    //   orderType,
    //   items: cart.map(item => ({ foodId: item._id, quantity: item.quantity })),
    //   total: cartTotal * 1.05, // Tax included for simplicity
    //   status: 'Pending',
    //   ...(orderType === 'Dine-In' && { tableNumber }),
    //   ...(orderType === 'Home Delivery' && { address })
    // };

    try {

      const res = await api.post(
        "/order/createorder",
        {
          orderType,
          items: cart.map(item => ({
            food: item._id,
            quantity: item.quantity,
          })),
          totalAmount: cartTotal * 1.05,
          rewardUsed: useReward,
          mobilenumber,
          ...(orderType === "Dine-In" && { tableNumber }),
          ...(orderType === "Home Delivery" && { address })
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log("Order API Response:", res.data);

      alert("Order placed successfully 🎉");

      clearCart();
      navigate("/my-orders");

    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div className="bg-darkCard p-6 rounded-2xl border border-darkBorder shadow-lg">
            <h2 className="text-xl font-bold mb-6 border-b border-darkBorder pb-4">Order Details</h2>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">Order Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Dine-In', 'Take Away', 'Home Delivery'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className={`py-3 px-2 rounded-xl text-sm font-semibold transition border ${orderType === type ? 'bg-primaryOrange/10 border-primaryOrange text-primaryOrange shadow-inner' : 'bg-darkBg border-darkBorder text-gray-400 hover:text-white hover:border-gray-500'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {orderType === 'Dine-In' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Table Number</label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-darkBg border border-darkBorder rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primaryOrange transition"
                      placeholder="e.g. 12"
                    />
                  </div>
                )}

                {orderType === 'Home Delivery' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Delivery Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="w-full bg-darkBg border border-darkBorder rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primaryOrange transition resize-none"
                      placeholder="Enter your full address"
                    />
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Mobile Number</label>
                    <input
                      type="text"
                      value={mobilenumber}
                      onChange={(e) => setMobilenumber(e.target.value)}
                      className="w-full bg-darkBg border border-darkBorder rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primaryOrange transition"
                      placeholder="xxxxxxxxxx"
                    />

                  </div>


                )}
              </div>
              {rewardAvailable && (
                <div className="bg-darkCard p-4 rounded-xl border border-darkBorder mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">🎁 Free Starter Available</span>
                    <button
                      type="button"
                      onClick={() => setUseReward(!useReward)}
                      className="bg-primaryOrange text-white px-4 py-2 rounded-lg"
                    >
                      {useReward ? "Remove" : "Apply"}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primaryOrange hover:bg-primaryOrangeHover text-white font-bold py-4 rounded-xl transition transform hover:scale-[1.02] active:scale-95 shadow-lg disabled:opacity-70 disabled:hover:scale-100 flex justify-center items-center"
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </span>
                ) : 'Confirm and Pay'}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-darkCard p-6 rounded-2xl border border-darkBorder shadow-lg sticky top-24">
            <h2 className="text-lg font-bold mb-4 border-b border-darkBorder pb-4">Order Summary</h2>
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-300 line-clamp-1 pr-4">
                    <span className="text-primaryOrange font-bold mr-2">{item.quantity}x</span>
                    {item.name}
                  </span>
                  <span className="font-semibold text-white whitespace-nowrap">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-darkBorder pt-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Tax (5%)</span>
                <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-darkBorder mt-2">
                <span>Total</span>
                <span className="text-primaryOrange">₹{(cartTotal * 1.05).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
