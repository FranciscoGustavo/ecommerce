import { Router } from "express";

import BannerController from '../controllers/BannerController';

class BannerRoutes {
    public router : Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes() : void {
        this.router.route('/')
            .get(BannerController.index)
            .post(BannerController.create);
        this.router.route('/:id')
            .get(
                BannerController.find,
                BannerController.show
            )
            .put(
                BannerController.find,
                BannerController.update
            )
            .delete(
                BannerController.find,
                BannerController.destroy
            )
    }
}

const bannerRoutes : BannerRoutes = new BannerRoutes();

export default bannerRoutes.router;