import React, { useEffect, useState, type FormEvent } from "react"
import NoteCard from "../components/NoteCard"
import type { Note } from "../types/note"
import * as api from "../services/note.api"
import { useNavigate } from "react-router-dom"

export default function TodoPage() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState('');
    const [query, setQuery] = useState('');
    const [content, setContent] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [editNoteId, setEditNoteId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editCategory, setEditCategory] = useState("");

    useEffect(() => {
        api.fetchNotes().then(res => setNotes(res.data))
    }, [])

    const addNote = async (e: FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;
        const res = await api.createNotes({ title, content })
        setNotes([res.data, ...notes]);
        setTitle('');
        setContent('');
        console.log("res", res)
    }

    const updateNote = async () => {
        if (!editNoteId) return;
        const res = await api.updateNotes(editNoteId, { title: editTitle, content: editContent, category: editCategory });
        console.log("res", res);
        setModalOpen(false);
        setNotes(notes => [
            res.data,
            ...notes.filter(note => note._id !== res.data._id)
        ]);
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!query) {
                const res = await api.fetchNotes();
                setNotes(res.data);
            } else {
                const searchResult = notes.filter((note) => note.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || note.content.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || note.category?.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
                if (searchResult?.length) {
                    setNotes(searchResult);
                } else {
                    const res = await api.searchNote(query);
                    setNotes(res.data);
                }
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);


    const deleteNote = async (id: string) => {
        if (!id) return;
        const res = await api.deleteNotes(id);
        console.log("res", res)
        setNotes(notes.filter(note => note._id !== id));
    }

    const searchNotes = async (query: string) => {
        setQuery(query);
    }

    const completeNote = async (editNoteId: string, status: boolean) => {
        if (!editNoteId) return;
        const res = await api.updateNotes(editNoteId, { completed: status });
        setModalOpen(false);
        setNotes(notes => [
            res.data,
            ...notes.filter(note => note._id !== res.data._id)
        ]);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-4">Notes App</h1>
                    <button className="profile-icon p-1" onClick={(e) => navigate('/profile')}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-6 h-6"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>

                    </button>
                </div>
                <label htmlFor="search" className="font-bold">Search Note</label>
                <div className="search-wrap bg-white p-4 rounded-lg mb-6 flex items-center gap-2 align-top">
                    <div className="relative w-full">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                        </svg>
                        <input name="search" placeholder="Search..." required className="search-input w-full border rounded px-10 py-2 " spellCheck="true" value={query} onChange={e => searchNotes(e.target.value)} ></input>
                    </div>
                    <button className="bg-blue-200 px-4 py-2 rounded cursor-pointer hover:bg-blue-400" onClick={(e) => setAddModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50">
                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                        </svg>
                    </button>
                </div>

                {/* Create Note */}
                {isAddModalOpen ?
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6">
                            <div className="bg-white p-4 rounded-lg mb-6">
                                <label htmlFor="create-note" className="font-bold">Create Note</label>
                                <form onSubmit={e => addNote(e)} name="create-note" className="mt-2">
                                    <input placeholder="Title" value={title} required onChange={e => setTitle(e.target.value)}
                                        className="w-full mb-2 border rounded px-3 py-2"
                                        spellCheck="true"
                                    />
                                    <textarea placeholder="Write your note..." required value={content} onChange={e => setContent(e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                        spellCheck="true"
                                    />
                                    <div className="flex gap-4">
                                        <input
                                            type="submit" value='Submit'
                                            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setAddModalOpen(false)}
                                            className="mt-3 bg-gray-200 px-4 py-2 rounded cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> : ''}

                {/* Notes Grid */}
                <div className="space-y-10">
                    <span className="font-bold">Notes List</span>
                    <div className="grid md:grid-cols-3 gap-4">
                        {notes?.filter((note) => { if (note?.completed == false) return note }).map(note => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onEdit={() => { setEditNoteId(note._id); setEditTitle(note.title); setEditContent(note.content); setEditCategory(note.category || ''); setModalOpen(true); }}
                                onDelete={() => deleteNote(note._id)}
                                onComplete={() => completeNote(note._id, true)}
                            />
                        ))}
                    </div>
                    {/*Completed Notes Grid */}
                    <span className="font-bold">Completed Notes List</span>
                    <div className="grid md:grid-cols-3 gap-4">
                        {notes?.filter((note) => { if (note?.completed == true) return note; }).map(note => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onEdit={() => { setEditNoteId(note._id); setEditTitle(note.title); setEditContent(note.content); setEditCategory(note.category || ''); setModalOpen(true); }}
                                onDelete={() => deleteNote(note._id)}
                                onComplete={() => completeNote(note._id, true)}
                            />
                        ))}
                    </div>
                </div>
                {/* update modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
                            <h2 className="text-lg font-semibold mb-4">Edit Note</h2>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    updateNote();
                                }}
                                className="space-y-3"
                            >
                                <input
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Title"
                                />

                                <textarea
                                    value={editContent}
                                    onChange={e => setEditContent(e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Content"
                                />

                                <input
                                    value={editCategory}
                                    onChange={e => setEditCategory(e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Category"
                                />

                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 bg-gray-200 rounded"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit" onClick={() => updateNote}
                                        className="px-4 py-2 bg-blue-600 text-white rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div >
    )


}