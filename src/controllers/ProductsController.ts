import { Request, Response, NextFunction } from 'express';

import Product from '../models/Product';
import buildParams from '../plugins/buildParams';
import { IFProduct } from '../config/interfaces'

class ProductsController {
    private validParams : string[];
    private product : any = {}; 

    constructor(){
        this.validParams = [
            '_category','_subcategory','typeProduct','title','headline','description','details','price','cover','offeredByCategory','offeredBySubCategory','offer', 'offerPrice','offerDiscount','offerCover','offerEnd', 'newProduct','weight','delivery'
        ];

        this.find = this.find.bind(this);
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.show = this.show.bind(this);
        this.update = this.update.bind(this);
    }

    find(req : Request, res : Response, next : NextFunction) : void {
        Product.findOne({slug: req.params.id})
        .then(doc => {
            this.product = doc;
            next();
        })
        .catch(err => {
            res.json(err)
        })
    }

    async index(req : Request, res : Response) : Promise<void>{
        const product = await Product.paginate({},{
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 5,
            sort: {'_id': -1}
        })

        res.json(product);
    }

    async create(req : Request, res : Response) : Promise<void> {
        const params : IFProduct = buildParams(this.validParams, req.body);

        const docs = await Product.create(params);

        res.json(docs);
    }

    async show(req : Request, res : Response) : Promise<void> {
        this.product.views = this.product.views + 1;
        const doc = await this.product.save();
        res.json(doc);
    }

    async update(req : Request, res : Response) : Promise<void>{
        const params : IFProduct = buildParams(this.validParams, req.body);

        this.product = Object.assign(this.product, params);
        this.product.updated_at = new Date();
                
        const doc : IFProduct = await this.product.save();

        res.json(doc);
    }
}

export default new ProductsController();