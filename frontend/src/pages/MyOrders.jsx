import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/order/my-orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setOrders(res.data.orders);
        console.log("Fetched orders:", res.data.orders);
      } catch (err) {
        console.warn("API Error `/orders/my-orders`, setting mock data");
        // Mock data
        setOrders([
          { _id: 'ord123', date: new Date().toISOString(), status: 'Preparing', total: 25.50, type: 'Home Delivery', items: [{ name: 'Classic Burger', quantity: 2 }, { name: 'Iced Latte', quantity: 1 }] },
          { _id: 'ord124', date: new Date(Date.now() - 86400000).toISOString(), status: 'Completed', total: 18.50, type: 'Dine-In', items: [{ name: 'Truffle Pasta', quantity: 1 }] },
          { _id: 'ord125', date: new Date(Date.now() - 172800000).toISOString(), status: 'Completed', total: 10.99, type: 'Take Away', items: [{ name: 'Classic Burger', quantity: 1 }] }
        ]);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return <div className="text-center py-32 text-gray-400 text-lg">Please login to view your orders.</div>;
  }

  if (loading) return <div className="text-center py-32 text-gray-400">Fetching your beautifully crafted orders...</div>;
  const handleDelete = async (id) => {
    try {
      await api.delete(`/order/${id}`);

      setOrders(orders.filter(order => order._id !== id));

      alert("Order deleted");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My <span className="text-primaryOrange">Orders</span></h1>

      {orders.length === 0 ? (
        <div className="bg-darkCard p-8 rounded-2xl text-center border border-darkBorder shadow-lg">
          <p className="text-gray-400">You haven't placed any orders yet. Time to get hungry!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={order._id}
              className="bg-darkCard border border-darkBorder p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-gray-600 transition"
            >
              <h3 className="font-bold text-white mb-1.5">
                {order.rewardUsed && (
                  <span className="ml-2 text-green-400 text-sm font-bold">
                    🎁 Free Starter
                  </span>
                )}
              </h3>
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${order.status === 'Completed' ? 'bg-green-500' : order.status === 'Preparing' ? 'bg-yellow-500' : 'bg-primaryOrange'}`} />

              <div className="flex flex-col md:flex-row justify-between mb-4 border-b border-darkBorder pb-4 ml-2">
                <div>
                  <h3 className="font-bold text-white mb-1.5">Order #{order._id.toUpperCase()}</h3>
                  <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleString()} • <span className="font-medium text-gray-300">{order.orderType}</span></p>
                </div>
                {order.orderType === "Dine-In" && (
                  <p className="text-sm text-gray-400 mt-1">
                    🍽 Table: {order.tableNumber}
                  </p>
                )}
                {order.orderType === "Home Delivery" && (
                  <p className="text-sm text-gray-400 mt-1">
                    📍 {order.address}
                    <br />
                    📞 {order.mobilenumber}
                  </p>
                )}
                <div className="mt-4 md:mt-0 flex items-center space-x-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : order.status === 'Preparing' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-primaryOrange/10 text-primaryOrange border border-primaryOrange/20'}`}>
                    {order.status}
                  </span>
                  <span className="font-bold text-2xl text-white">₹{Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
              <div className="ml-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Items Ordered</h4>
                <div className="flex flex-wrap gap-2 text-sm">
                  {order.items.map((item, i) => (
                    <span key={i} className="bg-darkBg text-gray-300 px-3 py-1.5 rounded-lg border border-darkBorder">
                      <span className="text-primaryOrange font-bold mr-2">{item.quantity}x</span>{item.food ? item.food.name : "Item has been deleted"}
                    </span>
                  ))}
                </div>
              </div>
              <div className='m-3'>
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
                  onClick={() => handleDelete(order._id)}>
                  Delete Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
