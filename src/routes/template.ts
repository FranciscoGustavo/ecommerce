import { Router } from "express";

import TemplateController from '../controllers/TemplateController';

class TemplateRoutes {
    public router : Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes() : void {
        this.router.route('/')
            .get(TemplateController.index)
            .post(TemplateController.create);
        this.router.route('/:id')
            .get(
                TemplateController.find,
                TemplateController.show
            )
            .put(
                TemplateController.find,
                TemplateController.update
            )
            .delete(
                TemplateController.find,
                TemplateController.destroy
            )
    }
}

const templateRoutes : TemplateRoutes = new TemplateRoutes();

export default templateRoutes.router;