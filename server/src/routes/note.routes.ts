import { Router } from "express";
import { createNote, deleteNote, getNotes, searchNote, updateNote } from "../controllers/note.controller.js";

const router = Router();

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/search', searchNote);


export default router;