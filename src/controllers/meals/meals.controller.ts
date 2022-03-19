import { Request, Response } from "express";
import { MealsDelegate } from "./meals.delegate";

class MealsController {
    private delegate: MealsDelegate
    constructor(){
        this.delegate = new MealsDelegate()

        this.meals = this.meals.bind(this)
        this.addMeal = this.addMeal.bind(this)
    }


    public async meals(req: Request, res: Response){
        return this.delegate.meals()
    }

    public async addMeal(req: Request, res: Response){
        return this.delegate.addMeal()
    }
}

export { MealsController }
