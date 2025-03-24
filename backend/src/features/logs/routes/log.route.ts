import express from "express";

import { addLog, updateLog, deleteLog , getLogs} from "../controllers/log.controller.js";
import { protectRoute } from "../../shared/middlewares/protectRoute.js";

const router = express.Router();

router.get("/",protectRoute,getLogs);

router.post("/add-log",protectRoute,addLog);

router.put("/:id",protectRoute,updateLog);

router.delete("/:id",protectRoute,deleteLog);

export default router;



