import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';


class CategoriesRoutes {
    public router : Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes() : void {
        this.router.route('/')
            .get(CategoriesController.index)
            .post(CategoriesController.create)

        this.router.route('/:id')
            .get(
                CategoriesController.find,
                CategoriesController.show
            )
            .put(
                CategoriesController.find,
                CategoriesController.update
            )
    }
}

const categoriesRoutes : CategoriesRoutes = new CategoriesRoutes();

export default categoriesRoutes.router;