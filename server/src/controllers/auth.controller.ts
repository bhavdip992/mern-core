import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";


export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User Already Exists" });

    const hassedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hassedPassword });

    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id.toString()), });
};


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Creadentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Creadentials" });

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
    });
};