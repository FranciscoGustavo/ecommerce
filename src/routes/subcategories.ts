import { Router } from 'express';
import SubCategoriesController from '../controllers/SubcategoriesController';

class SubCategoriesRoutes {
    public router : Router;

    constructor(){
        this.router = Router();
        this.routes();
    }
 
    routes() : void {
        this.router.route('/')
            .get(SubCategoriesController.index)
            .post(SubCategoriesController.create)
        this.router.route('/:id')
            .get(
                SubCategoriesController.find,
                SubCategoriesController.show
            )
            .put(
                SubCategoriesController.find,
                SubCategoriesController.update
            )
    }

}

const subCategoriesRoutes : SubCategoriesRoutes = new SubCategoriesRoutes();

export default subCategoriesRoutes.router 