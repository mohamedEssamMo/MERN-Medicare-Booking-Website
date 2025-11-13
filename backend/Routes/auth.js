import express from 'express'
import { register, Login } from './../Controllers/authController.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", Login)

export default router;

