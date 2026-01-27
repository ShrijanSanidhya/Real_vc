import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { requireInterviewer } from "../middleware/roleCheck.js";
import {
    createProblem,
    deleteProblem,
    getAllProblems,
    getProblemById,
    seedProblems,
    updateProblem,
    generateProblem,
} from "../controllers/problemController.js";

const router = express.Router();

// Public routes (authenticated users)
router.get("/", protectRoute, getAllProblems);
router.get("/:id", protectRoute, getProblemById);

// Interviewer only routes
router.post("/", protectRoute, requireInterviewer, createProblem);
router.put("/:id", protectRoute, requireInterviewer, updateProblem);
router.delete("/:id", protectRoute, requireInterviewer, deleteProblem);
router.post("/seed", protectRoute, requireInterviewer, seedProblems);
router.post("/generate", protectRoute, requireInterviewer, generateProblem);

export default router;
