import express from "express";

import { addLog, updateLog, deleteLog , getLogs, getLogById} from "../controllers/log.controller.js";

const router = express.Router();

router.get("/",getLogs);
router.get("/:id",getLogById);

router.post("/add-log",addLog);

router.put("/update-log/:id",updateLog);

router.delete("/delete-log/:id",deleteLog);

export default router;



