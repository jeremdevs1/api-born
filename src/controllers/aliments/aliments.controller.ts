import { Request, Response } from "express";
import { AlimentDelegate } from "./aliments.delegate";

class AlimentsController {
    private delegate: AlimentDelegate
    constructor(){
        this.delegate = new AlimentDelegate()

        this.aliments = this.aliments.bind(this)
        this.addAliment = this.addAliment.bind(this)
    }


    public async aliments(req: Request, res: Response){
        return this.delegate.aliments()
    }

    public async addAliment(req: Request, res: Response){
        return this.delegate.addAliment()
    }
}

export { AlimentsController }
