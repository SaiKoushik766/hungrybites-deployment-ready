import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { FaGift, FaStar } from 'react-icons/fa';

const Rewards = () => {
  const { user, login } = useContext(AuthContext);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await api.get('/user/profile');
        setPoints(res.data.user.loyaltyPoints);
        console.log("Fetched points:", res.data);
      } catch (err) {
        console.warn("API Error, setting mock points");
        setPoints(1250);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPoints();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRedeem = async () => {
    try {
      const res = await api.post("/reward/redeem", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log("Redeem response:", res.data);

      // ✅ Correct values from backend
      setPoints(res.data.loyaltyPoints);

      alert("Reward activated 🎁");

    } catch (error) {
      console.error("Redeem error:", error);
      alert(error.response?.data?.message || "Failed to redeem reward");
    }
  };

  if (!user) {
    return <div className="text-center py-32 text-gray-400 text-lg">Please login to view your exciting rewards.</div>;
  }

  if (loading) return <div className="text-center py-32 text-gray-400">Loading your rewards...</div>;

  const progress = Math.min((points / 40) * 100, 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-center">
      <FaGift className="mx-auto text-6xl text-primaryOrange mb-6 drop-shadow-[0_0_15px_rgba(255,122,0,0.5)]" />
      <h1 className="text-4xl font-bold mb-4">Your <span className="text-primaryOrange">Rewards</span></h1>
      <p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">Earn loyalty points with every order and redeem them for exclusive discounts and free meals! 1000 points = $10 off your next order.</p>

      <div className="bg-darkCard p-10 rounded-3xl border border-darkBorder shadow-2xl max-w-sm mx-auto relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primaryOrange/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

        <div className="flex justify-center items-center space-x-3 mb-2 relative z-10">
          <FaStar className="text-yellow-400 text-3xl" />
          <span className="text-6xl font-black text-white tracking-tighter">{points}</span>
        </div>
        <p className="text-gray-400 font-medium mb-10 uppercase tracking-widest text-sm relative z-10">Available Points</p>

        <div className="mb-8 relative z-10">
          <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
            <span>0</span>
            <span>40 required</span>
          </div>
          <div className="w-full bg-darkBg rounded-full h-4 border border-darkBorder overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-primaryOrange to-yellow-400 h-4 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,122,0,0.8)]"
              style={{
                width: `${progress}%`,
                transition: "width 1s ease-in-out"
              }}
            ></div>
          </div>
        </div>

        <button
          onClick={handleRedeem}
          disabled={points < 40 || redeeming}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg relative z-10 ${points >= 40 ? 'bg-primaryOrange hover:bg-primaryOrangeHover text-white transform hover:scale-105 active:scale-95 shadow-primaryOrange/20' : 'bg-darkBg text-gray-500 cursor-not-allowed border border-darkBorder'}`}
        >
          {points >= 40 ? 'Redeem Reward' : 'Keep Eating to Earn!'}
        </button>
      </div>
    </div>
  );
};

export default Rewards;
