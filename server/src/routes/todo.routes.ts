import { Router } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);


export default router;