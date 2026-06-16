import api from './api'
export const loginUser = async (data) => {
  const res = await api.post("/auth/user/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/auth/user/register", data);
  return res.data;
};