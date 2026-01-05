import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";


export interface IAuth extends Request {
    user?: any;
    userId?: string;
}

export const protect = async (
    req: IAuth,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ message: "Not Authorized" });
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await userModel.findById(decode.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        req.userId = user._id.toString();
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" })
    }
}