import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

// User Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import Rewards from './pages/Rewards';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageOrders from './pages/admin/ManageOrders';
import ManageFoods from './pages/admin/ManageFoods';
import ManageUsers from './pages/admin/ManageUsers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="rewards" element={<Rewards />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="foods" element={<ManageFoods />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
