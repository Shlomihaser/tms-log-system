import express from "express";
import { login ,logout, checkAuth} from "../controllers/auth.controller.js";
import { protectRoute } from "../../shared/middlewares/protectRoute.js";


const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);

router.get("/user",protectRoute,checkAuth);

export default router;