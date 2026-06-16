import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

const ManageFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '', image: null, isAvailable: true });
  const [editingFood, setEditingFood] = useState(null);
  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await api.get('/food/get');
      setFoods(res.data.foods);
      console.log("Fetched foods:", res.data);
    } catch {
      console.warn("API Error, mocking admin foods");
      setFoods([
        { _id: 'f1', name: 'Classic Burger', price: 10.99, category: 'Burgers' },
        { _id: 'f2', name: 'Cheese Pizza', price: 14.50, category: 'Pizza' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);

      if (formData.image) {
        data.append("image", formData.image);
      }

      let res;

      if (editingFood) {
        // ✅ UPDATE
        res = await api.put(`/food/update/${editingFood._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        setFoods(foods.map(f =>
          f._id === editingFood._id ? res.data.food : f
        ));

        alert("Food updated successfully ✅");

      } else {
        // ✅ ADD
        res = await api.post("/food/add", data, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        setFoods([...foods, res.data.food]);

        alert("Food added successfully ✅");
      }

      // reset
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Burgers',
        image: null
      });

      setEditingFood(null);

    } catch (error) {
      console.error(error);
      alert("Operation failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await api.delete(`/food/delete/${id}`);
        setFoods(foods.filter(f => f._id !== id));
      } catch {
        alert("Failed to delete food");
      }
    }
  };

  if (loading) return <div className="text-gray-400 py-10">Loading Foods...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage <span className="text-primaryOrange">Foods</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Add Food Form */}
        <div className="lg:col-span-1">
          <div className="bg-darkCard p-6 rounded-2xl border border-darkBorder shadow-xl sticky top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center"><FaPlus className="mr-2 text-primaryOrange" /> Add New Food</h2>
            <form onSubmit={handleAddFood} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-darkBg border border-darkBorder rounded-lg px-4 py-2.5 text-white outline-none focus:border-primaryOrange transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
                <textarea required rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-darkBg border border-darkBorder rounded-lg px-4 py-2.5 text-white outline-none focus:border-primaryOrange transition resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Price (rupees)</label>
                  <input required type="number" step="0.01" min="0" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full bg-darkBg border border-darkBorder rounded-lg px-4 py-2.5 text-white outline-none focus:border-primaryOrange transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">Category</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-darkBg border border-darkBorder rounded-lg px-4 py-2.5 text-white outline-none focus:border-primaryOrange transition cursor-pointer">
                    {['veg', 'non-veg', 'Drinks'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Image URL</label>
                {editingFood && editingFood.image && (
                  <img
                    src={editingFood.image}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded mb-2"
                  />
                )}
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full bg-darkBg border border-darkBorder rounded-lg px-4 py-2.5 text-white"
                />
              </div>
              <button type="submit" className="w-full bg-primaryOrange hover:bg-primaryOrangeHover text-white font-bold py-3.5 rounded-xl transition mt-5 shadow-lg active:scale-95">
                {editingFood ? "Update Food" : "Save Food Item"}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Foods Table */}
        <div className="lg:col-span-2">
          <div className="bg-darkCard border border-darkBorder rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-darkBg border-b border-darkBorder text-gray-400 uppercase text-xs tracking-widest">
                    <th className="p-4 font-bold">Food Item</th>
                    <th className="p-4 font-bold">Category</th>
                    <th className="p-4 font-bold">Price</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food, idx) => (
                    <tr key={food._id} className={`border-b border-darkBorder/50 ${idx % 2 === 0 ? 'bg-darkCard' : 'bg-darkBg/30'} hover:bg-darkBorder/40 transition`}>
                      <td className="p-4 text-white font-medium">{food.name}</td>
                      <td className="p-4 text-gray-300"><span className="bg-darkBorder px-2 py-1 rounded text-xs">{food.category}</span></td>
                      <td className="p-4 text-primaryOrange font-bold">${food.price.toFixed(2)}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingFood(food);
                            setFormData({
                              name: food.name,
                              description: food.description,
                              price: food.price,
                              category: food.category,
                              image: null
                            });
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(food._id)} className="text-red-500 hover:text-white p-2.5 bg-red-500/10 rounded-lg hover:bg-red-500 transition shadow" title="Delete">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {foods.length === 0 && <div className="text-center py-10 text-gray-500">No food items added yet.</div>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageFoods;
