import type { Request, Response } from "express";
import Note from "../models/note.model.js";

export const getNotes = async (_: Request, res: Response): Promise<void> => {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.json(notes);
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
    const note = await Note.create(req.body);
    res.status(201).json(note);
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    const note = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(note);
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
};

export const searchNote = async (req: Request, res: Response): Promise<void> => {
    const { search } = req.query;
    let query = {};
    if (search && typeof search == 'string') {
        query = {
            $or: [
                { title: { $regex: search, $options: 'xi' } },
                { content: { $regex: search, $options: 'xi' } },
                { category: { $regex: search, $options: 'xi' } },
            ]
        }
    }
    const notes = await Note.find(query).sort({ updatedAt: -1 })
    res.json(notes)
}