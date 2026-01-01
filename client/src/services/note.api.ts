import axios from "axios";
import type { Note } from "../types/note";

const API_URL = 'http://localhost:3000/api/notes';

export const fetchNotes = () => {
    return axios.get<Note[]>(API_URL);
}
export const createNotes = (body: object) => {
    return axios.post<Note>(API_URL, body);
}
export const updateNotes = (id: string, body: object) => {
    return axios.put(`${API_URL}/${id}`, body);
}
export const deleteNotes = (id: string) => {
    return axios.delete(`${API_URL}/${id}`);
}
export const searchNote = (query: string) => {
    return axios.get(`${API_URL}/search?search=${query}`);
}