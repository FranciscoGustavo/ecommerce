import { Request, Response } from 'express';
import { Types } from 'mongoose';

import SubCategory from '../models/SubCategory';
import { IFSubCategory } from '../config/interfaces';
import buildParams from '../plugins/buildParams';
import { NextFunction } from 'connect';


class SubCategoriesController {
    private validParams: string[];
    private subcategory : any = {};

    constructor(){
        this.validParams = ['name','_category'];

        this.find = this.find.bind(this);
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.show = this.show.bind(this);
        this.update = this.update.bind(this);
    }

    find(req : Request, res : Response, next : NextFunction){
        SubCategory.find({slug : req.params.id})
        .then(doc => {
            this.subcategory = doc;
            next();
        })
        .catch(err => res.json(err))
    }

    async index(req : Request, res : Response) {
        let params: any = {
            name : {  $regex : req.query.name || "" }
        };
    
        if(req.query.id) params['_category'] = Types.ObjectId(req.query.id);
        
        const subcategories = await SubCategory.paginate(params, {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 5,
            sort: {'_id': -1}
        })

        res.json(subcategories)
    }

    async create(req : Request, res : Response){
        const params : IFSubCategory = buildParams(this.validParams, req.body); 
        
        const doc = await SubCategory.create(params);
        
        res.json(doc);
    }

    show(req : Request, res : Response){
        res.json(this.subcategory)
    }

    async update(req : Request, res : Response){
        const params : IFSubCategory = buildParams(this.validParams, req.body);

        this.subcategory = Object.assign(this.subcategory, params);
        this.subcategory.updatet_at = new Date();

        const doc = await this.subcategory.save();

        res.json(doc);
    }
}

export default new SubCategoriesController();