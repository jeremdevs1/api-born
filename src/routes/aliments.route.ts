import { Router } from "express";
import { AlimentsController } from "../controllers/aliments/aliments.controller";

const router = Router();
const alimentsController = new AlimentsController()

router.get("/", alimentsController.aliments);
router.post("/", alimentsController.addAliment);

export default router;
