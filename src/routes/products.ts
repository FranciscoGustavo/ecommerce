import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';


class ProductsRouter {
    public router : Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes():void{
        this.router.route('/')
            .get(ProductsController.index)
            .post(ProductsController.create)

        this.router.route('/:id')
            .get(
                ProductsController.find,
                ProductsController.show
            )
            .put(
                ProductsController.find,
                ProductsController.update
            )
    }
}

const productsRouter : ProductsRouter = new ProductsRouter();

export default productsRouter.router;