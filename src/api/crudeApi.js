import axios from "axios";


const API = axios.create({
baseURL: "https://crude-mern-backend.vercel.app",
});


export const getUserById = (eid) => API.get(`/${eid}`);
export const getUsers = () => API.get("/");
export const createUser = async (data) => API.post("/", data);
export const updateUser = (id, data) => API.put(`/${id}`, data);
export const deleteUser = (id) => API.delete(`/${id}`);
