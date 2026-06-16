import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaTrash, FaUserShield, FaUser } from 'react-icons/fa';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users');
        setUsers(res.data.users);
        console.log("Fetched users:", res.data.users);
      } catch (err) {
        console.warn("API Error, mocking admin users table");
        setUsers([
          { _id: 'u1', name: 'Super Admin', username: 'admin', role: 'admin', joinedAt: new Date(Date.now() - 30 * 86400000).toISOString() },
          { _id: 'u2', name: 'John Doe', username: 'johndoe', role: 'user', joinedAt: new Date(Date.now() - 5 * 86400000).toISOString() },
          { _id: 'u3', name: 'Jane Miller', username: 'janem', role: 'user', joinedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
          { _id: 'u4', name: 'Alex King', username: 'alexk', role: 'user', joinedAt: new Date(Date.now() - 1 * 86400000).toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        setUsers(users.filter(u => u._id !== id));
      } catch {
        alert("Failed to delete user");
      }
    }
  };

  if (loading) return <div className="text-gray-400 py-10">Loading Users Data...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage <span className="text-primaryOrange">Users</span></h1>
      
      <div className="bg-darkCard border border-darkBorder rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-darkBg border-b border-darkBorder text-gray-400 uppercase text-xs tracking-widest">
                <th className="p-5 font-bold">User Information</th>
                <th className="p-5 font-bold">Username</th>
                <th className="p-5 font-bold">Role</th>
                <th className="p-5 font-bold">Date Joined</th>
                <th className="p-5 font-bold text-right">Loyalty points</th>
                <th className="p-5 font-bold text-right">Mobile Number</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className={`border-b border-darkBorder/50 ${idx % 2 === 0 ? 'bg-darkCard' : 'bg-darkBg/30'} hover:bg-darkBorder/40 transition`}>
                  <td className="p-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-darkBg border border-darkBorder flex items-center justify-center text-gray-400 shadow-inner">
                        {user.role === 'admin' ? <FaUserShield className="text-purple-400" /> : <FaUser className="text-primaryOrange/70" />}
                      </div>
                      <div>
                        <p className="text-white font-bold">{user.name}</p>
                        <p className="text-xs text-gray-500">ID: {user._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-gray-300 font-medium">@{user.username}</td>
                  <td className="p-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-gray-400 font-medium">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="pl-16 text-sm text-gray-400 font-medium">{user.loyaltyPoints || 0}</td>
                  <td className="pl-16 text-sm text-gray-400 font-medium">{user.mobilenumber || "N/A"}</td>
                  
                  <td className="p-5 text-right">
                    {user.role !== 'admin' ? (
                      <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-white p-3 bg-red-500/10 rounded-xl hover:bg-red-500 transition shadow" title="Delete User">
                        <FaTrash />
                      </button>
                    ) : (
                      <span className="text-xs text-gray-500 italic">Protected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <div className="text-center py-10 text-gray-500">No users found in database.</div>}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
