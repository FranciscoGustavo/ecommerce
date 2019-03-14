import { Request, Response, NextFunction } from 'express';

import Template from '../models/Template';
import buildParams from '../plugins/buildParams';
import { IFTemplate } from '../config/interfaces';

class TemplateController {
    private template : any;
    private validParams : string[];

    constructor(){
        this.validParams = ['topBar', 'textBar', 'backColor', 'textColor', 'logo', 'icon', 'socialNetwork'];

        this.find = this.find.bind(this);
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.show = this.show.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);

    }

    find(req : Request, res : Response, next : NextFunction){
        Template.findById(req.params.id)
        .then(doc => {
            this.template = doc;
            next();
        })
        .catch(err => res.json(err))
    }

    index(req : Request, res : Response) : void {
        Template.paginate({},{
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 5,
            sort: {'_id': -1}
        })
        .then(docs => res.json(docs))
        .catch(console.log)
    }

    async create(req : Request, res : Response) {
        const params : IFTemplate = buildParams(this.validParams, req.body);

        try {
            const docs = await Template.create(params);
            res.json(docs);
        } catch(err) {            
            res.json(err);
        }
    }

    show(req : Request, res : Response){
        res.json(this.template);
    }

    async update(req : Request, res : Response){
        const params : IFTemplate = buildParams(this.validParams, req.body);
        
        this.template = Object.assign(this.template, params);
        this.template.updated_at = new Date();
        
        try {
            const doc = await this.template.save();
            res.json({
                message : 'update saccesful',
                doc
            });
        } catch(err) {
            res.json(err);
        }
        
    }

    async destroy(req : Request, res : Response){
        try {
            const doc = await this.template.remove();
            res.json({
                message : 'delete succeful',
                doc
            });
        } catch(err) {
            res.json(err);
        }
    }
}

export default new TemplateController();