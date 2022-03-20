import { Router } from "express";
import { order } from "../controllers/orders/order.controller";

const router = Router();

router.get("/", order);
router.post("/", order);
router.put("/:id", order);
router.delete("/:id", order);

export default router;
