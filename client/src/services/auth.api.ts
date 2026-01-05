import axios from "axios";
import type { User } from "../types/user";

const API = 'http://localhost:3000/api/auth';

export const register = (data: {
    name: string;
    email: string;
    password: string;
}) => axios.post<User>(`${API}/register`, data);

export const loginUser = (data: {
    email: string;
    password: string;
}) => axios.post<User>(`${API}/login`, data);


export const getProfile = (token: string) => {
    return axios.post<User>(`${API}/profile`, {}, { headers: { Authorization: `Bearer ${token}` } })
};