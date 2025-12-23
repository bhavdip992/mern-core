import axios from "axios";
import type { Todo } from "../types/todo";

const API_URL = 'http://localhost:3000/api/todos';

export const fetchTodos = () => {
    return axios.get<Todo[]>(API_URL);
}
export const createTodos = (title: string) => {
    return axios.post<Todo>(API_URL, { title });
}
export const updateTodos = (id: string, body: object) => {
    return axios.put(`${API_URL}/${id}`, body);
}

export const deleteTodos = (id: string) => {
    return axios.delete(`${API_URL}/${id}`);
}