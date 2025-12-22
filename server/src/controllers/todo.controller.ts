import type { Request, Response } from "express";
import Todo from "../models/todos.model.js";

export const getTodos = async (_: Request, res: Response): Promise<void> => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    const todo = await Todo.create({ title: req.body.title });
    res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
};