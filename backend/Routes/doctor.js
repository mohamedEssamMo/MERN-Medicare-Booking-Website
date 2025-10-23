import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["doctor"]), getSingleDoctor);
router.get("/", authenticate, restrict(["admin"]), getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

export default router;