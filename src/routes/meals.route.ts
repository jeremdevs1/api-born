import { Router } from "express";
import { MealsController } from "../controllers/meals/meals.controller";

const router = Router();
const mealsController = new MealsController()

router.get("/", mealsController.meals);
router.post("/", mealsController.addMeal);

export default router;
