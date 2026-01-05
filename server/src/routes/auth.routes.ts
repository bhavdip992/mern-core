import { Router, type Response } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { protect, type IAuth } from "../middleware/auth.middleware.js";


const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/profile', protect, (req: IAuth, res: Response) => {
    res.json({ message: "Protected Route Accessed", user: req.user, });
});

export default router;

