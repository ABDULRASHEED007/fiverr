import express from "express";
const router = express.Router();
import { register, login, logout } from "../controller/auth.controller.js"
// import protect from "../middleware/authMiddleware.js"


router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
// router.put("/becomeSeller", protect, becomeSeller)

export default router;