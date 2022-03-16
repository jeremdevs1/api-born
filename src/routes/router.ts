import { sign } from "crypto";
import { Router } from "express";
import { addAliment, aliments } from "../controllers/adminController";
import { login, signup } from "../controllers/authController";
import { order } from "../controllers/OrderController";
import { TokenVerify } from "../middleware/authToken";

const router: Router = Router();
router.post("/signup", signup);
router.post("/login", login);

router.post("/order", TokenVerify, order);

router.post("/aliment", TokenVerify, addAliment);
router.get("/aliment", TokenVerify, aliments);
router.put("/aliment", TokenVerify, order);
router.delete("/aliment", TokenVerify, order);
export default router;
