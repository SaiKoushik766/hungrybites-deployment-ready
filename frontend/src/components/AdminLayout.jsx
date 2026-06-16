import React from 'react';
import { Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { FaTachometerAlt, FaUtensils, FaUsers, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
    { name: 'Orders', path: '/admin/orders', icon: <FaBoxOpen /> },
    { name: 'Foods', path: '/admin/foods', icon: <FaUtensils /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
  ];

  return (
    <div className="flex min-h-screen bg-darkBg text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-darkCard border-r border-darkBorder flex flex-col hidden md:flex">
        <div className="p-6 text-2xl font-bold text-primaryOrange">Admin Panel</div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition ${isActive ? 'bg-primaryOrange text-white' : 'hover:bg-darkBorder text-gray-400 hover:text-white'}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-darkBorder transition text-gray-400 hover:text-white">
            <FaSignOutAlt />
            <span>Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
