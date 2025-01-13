import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/jwt.js";
import { createMessage, getMessages } from "../controller/message.controller.js";


router.post("/", verifyToken, createMessage)
router.get("/:id", verifyToken, getMessages)

export default router;