import api from "./api";
 export const getfood = async () => {
  const res = await api.get("/food/get");
  return res.data;
}   