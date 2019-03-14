import { Router } from 'express';
import MainController from '../controllers/MainController';

class MainRoutes {
    public router : Router;

    constructor(){
        this.router = Router();
        this.routes();
    }
 
    routes() : void {
        this.router.route('/')
            .get(MainController.index);
        this.router.route('/createslider')
            .get(MainController.slide)
    }

}

const mainRoutes : MainRoutes = new MainRoutes();

export default mainRoutes.router 