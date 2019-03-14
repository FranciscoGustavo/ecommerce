import { Router } from "express";

import SlideController from '../controllers/SlideController';

class SlideRoutes {
    public router : Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes() : void {
        this.router.route('/')
            .get(SlideController.index)
            .post(SlideController.create);
        this.router.route('/:id')
            .get(
                SlideController.find,
                SlideController.show
            )
            .put(
                SlideController.find,
                SlideController.update
            )
        }
}

const slideRoutes : SlideRoutes = new SlideRoutes();

export default slideRoutes.router;