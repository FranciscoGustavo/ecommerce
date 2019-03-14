import { Request, Response, NextFunction } from 'express';

import Category from '../models/Category';
import buildParams from '../plugins/buildParams';
import { IFCategory } from '../config/interfaces'

class CategoriesController {
    private validParams : string[];
    private category : any = {}; 

    constructor(){
        this.validParams = ['name'];

        this.find = this.find.bind(this);
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.show = this.show.bind(this);
        this.update = this.update.bind(this);
    }

    find(req : Request, res : Response, next : NextFunction) : void {
        Category.findOne({slug: req.params.id})
        .then(doc => {
            this.category = doc;
            next();
        })
        .catch(err => {
            res.json(err)
        })
    }

    async index(req : Request, res : Response) : Promise<void>{
        const categories = await Category.paginate({},{
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 5,
            sort: {'_id': -1}
        })

        res.json(categories);
    }

    async create(req : Request, res : Response) : Promise<void> {
        const params : IFCategory = buildParams(this.validParams, req.body);

        const docs = await Category.create(params);

        res.json(docs);
    }

    show(req : Request, res : Response) : void {
        res.json(this.category);
    }

    async update(req : Request, res : Response) : Promise<void>{
        const params : IFCategory = buildParams(this.validParams, req.body);

        this.category = Object.assign(this.category, params);
        this.category.updatet_at = new Date();
                
        const doc = await this.category.save();

        res.json(doc);
    }
}

export default new CategoriesController();