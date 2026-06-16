import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/order/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setOrders(res.data.orders);
        console.log("Fetched orders:", res.data.orders);
      } catch (err) {
        console.warn("API Error, mocking admin orders");
        setOrders([
          { _id: 'ordx1', user: 'johndoe123', total: 45.0, status: 'Pending', type: 'Home Delivery' },
          { _id: 'ordx2', user: 'janem', total: 12.5, status: 'Preparing', type: 'Take Away' },
          { _id: 'ordx3', user: 'alexk', total: 85.2, status: 'Completed', type: 'Dine-In' },
          { _id: 'ordx4', user: 'sarahb', total: 22.0, status: 'Ready', type: 'Take Away' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(
        `/order/${id}/status`,   // ✅ correct endpoint
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      // update UI after success
      setOrders(orders.map(o =>
        o._id === id ? { ...o, status: newStatus } : o
      ));

    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="text-gray-400 py-10">Loading Orders...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage <span className="text-primaryOrange">Orders</span></h1>

      <div className="bg-darkCard border border-darkBorder rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-darkBg border-b border-darkBorder text-gray-400 uppercase text-xs tracking-widest">
                <th className="p-5 font-bold">Order ID</th>
                <th className="p-5 font-bold">Customer User</th>
                <th className="p-5 font-bold">Order Type</th>
                <th className="p-5 font-bold">Details</th>
                <th className="p-5 font-bold">Total</th>
                <th className="p-5 font-bold">Status</th>
                <th className="p-5 font-bold text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id} className={`border-b border-darkBorder/50 ${idx % 2 === 0 ? 'bg-darkCard' : 'bg-darkBg/30'} hover:bg-darkBorder/40 transition`}>
                  <td className="p-5 text-white font-semibold">
                    #{order._id.toUpperCase()}
                    {order.rewardUsed && (
                      <span className="ml-3 text-green-400 text-xs font-bold">
                        🎁 Free Starter
                      </span>
                    )}
                  </td>
                  <td className="p-5 text-gray-300 font-medium">@{order.user?.username || "Unknown"}</td>
                  <td className="p-5 text-gray-300">
                    <span className="bg-darkBorder px-2 py-1 rounded text-xs">{order.orderType}</span>
                  </td>
                  <td className="p-5 text-gray-300 text-sm">
                    {order.orderType === "Dine-In" && (
                      <span>🍽 Table: {order.tableNumber || "N/A"}</span>
                    )}

                    {order.orderType === "Home Delivery" && (
                      <span>🏠 {order.address || "No Address"}, Mobile: {order.mobilenumber || "N/A"}</span>
                    )}

                    {order.orderType === "Take Away" && (
                      <span>🛍 Pickup</span>
                    )}
                  </td>
                  <td className="p-5 text-primaryOrange font-black">₹{Number(order.totalAmount).toFixed(2)}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : order.status === 'Preparing' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : order.status === 'Ready' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-primaryOrange/20 text-primaryOrange border border-primaryOrange/30'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="bg-darkBg border border-darkBorder text-white text-sm font-semibold rounded-lg px-3 py-2 outline-none focus:border-primaryOrange cursor-pointer hover:bg-darkBorder transition"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Ready">Ready</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="text-center py-10 text-gray-500">No recent orders.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
