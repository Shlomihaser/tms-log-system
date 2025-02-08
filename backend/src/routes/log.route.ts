import express from "express";

import { addLog, updateLog, deleteLog , getLogs, getLogById} from "../controllers/log.controller.js";

const router = express.Router();

router.get("/",getLogs);
router.get("/:id",getLogById);

router.post("/add-log",addLog);

router.put("/:id",updateLog);

router.delete("/:id",deleteLog);

export default router;



