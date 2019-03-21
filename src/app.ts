import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import mainRoutes from './routes/main';
import slideRoutes from './routes/slide';
import bannerRoutes from './routes/banner';
import templateRoutes from './routes/template';
import categoriesRoutes from './routes/categories';
import subcategoriesRoutes from './routes/subcategories';
import productsRoutes from './routes/products';

import DataBase from './config/database';

export default class Server {
    public app : express.Application;

    constructor(){
        this.app = express();
        this.config();    
        this.routes();    
    }

    config(){
        DataBase.connect();
        // Settings
        this.app.set('port', process.env.PORT || 8080);
        // Middlewares
        this.app.use( morgan('dev') );
        this.app.use( express.json() )
        this.app.use( express.urlencoded({extended:false}) )
        this.app.use( helmet() );
        this.app.use( compression() );
        this.app.use( cors() );
    }

    routes(){
        this.app.use( mainRoutes );
        this.app.use( '/slide', slideRoutes );
        this.app.use( '/template', templateRoutes );
        this.app.use( '/banner', bannerRoutes );
        this.app.use( '/categories', categoriesRoutes );
        this.app.use( '/subcategories', subcategoriesRoutes );
        this.app.use( '/products', productsRoutes );
    }

    start(){
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server run onport ' + this.app.get('port'));
        })
    }
}