import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaBoxOpen, FaUsers, FaChartPie } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalOrders: 0, totalUsers: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard-stats');
        setStats(res.data);
      } catch (err) {
        console.warn("API Error, setting mock stats for Admin Dashboard");
        setStats({ totalOrders: 156, totalUsers: 84, totalRevenue: 4250.50 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="text-gray-400 py-10">Loading Dashboard Analytics...</div>;

  const STAT_CARDS = [
    { title: 'Total Orders', value: stats.totalOrders, icon: <FaBoxOpen className="text-4xl" />, color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { title: 'Total Users', value: stats.totalUsers, icon: <FaUsers className="text-4xl" />, color: 'bg-green-500/10 text-green-500 border-green-500/20' },
    { title: 'Total Revenue', value: `₹${stats.totalRevenue.toFixed(2)}`, icon: <FaChartPie className="text-4xl" />, color: 'bg-primaryOrange/10 text-primaryOrange border-primaryOrange/20' },
    {
      title: 'Today Orders',
      value: stats.todayOrders,
      icon: <FaBoxOpen />,
      color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders,
      icon: <FaChartPie />,
      color: 'bg-red-500/10 text-red-500 border-red-500/20'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard <span className="text-primaryOrange">Overview</span></h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {STAT_CARDS.map((card, idx) => (
          <div key={idx} className={`p-8 rounded-3xl border flex items-center justify-between shadow-xl ${card.color}`}>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-3 opacity-80">{card.title}</p>
              <h2 className="text-5xl font-black text-white">{card.value}</h2>
            </div>
            <div className="p-5 bg-darkBg/50 rounded-2xl shadow-inner">
              {card.icon}
            </div>
          </div>
        ))}
      </div>
      <p className="text-gray-400 mt-4">
        📈 You earned ₹{stats.todayRevenue} today from {stats.todayOrders} orders
      </p>

      <div className="bg-darkCard p-8 rounded-3xl border border-darkBorder shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <p className="text-gray-400 text-sm mb-6">Manage aspects of your restaurant efficiently using the sidebar navigation.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Placeholders for any future quick actions */}
          <div className="bg-darkBg p-4 rounded-xl border border-darkBorder text-center hover:border-primaryOrange cursor-pointer transition">
            <span className="text-primaryOrange font-bold">+ New Food</span>
          </div>
          <div className="bg-darkBg p-4 rounded-xl border border-darkBorder text-center hover:border-primaryOrange cursor-pointer transition">
            <span className="text-primaryOrange font-bold">Print Report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
