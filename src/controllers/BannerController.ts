import { Request, Response, NextFunction } from 'express';

import Banner from '../models/Banner';
import buildParams from '../plugins/buildParams';
import { IFBanner } from '../config/interfaces';

class BannerController {
    private banner : any;
    private validParams : string[];

    constructor(){
        this.validParams = ['route', 'image', 'titleOne', 'titleTwo', 'titleThree', 'style'];

        this.find = this.find.bind(this);
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.show = this.show.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);

    }

    find(req : Request, res : Response, next : NextFunction){
        Banner.findById(req.params.id)
        .then(doc => {
            this.banner = doc;
            next();
        })
        .catch(err => res.json(err))
    }

    index(req : Request, res : Response) : void {
        Banner.paginate({},{
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 5,
            sort: {'_id': -1}
        })
        .then(docs => res.json(docs))
        .catch(res.json)
    }

    async create(req : Request, res : Response) {
        const params : IFBanner = buildParams(this.validParams, req.body);

        try {
            const docs = await Banner.create(params);
            res.json(docs);
        } catch(err) {            
            res.json(err);
        }
    }

    show(req : Request, res : Response){
        res.json(this.banner);
    }

    async update(req : Request, res : Response){
        const params : IFBanner = buildParams(this.validParams, req.body);
        
        this.banner = Object.assign(this.banner, params);
        this.banner.updated_at = new Date();
        
        try {
            const doc = await this.banner.save();
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
            const doc = await this.banner.remove();
            res.json({
                message : 'delete succeful',
                doc
            });
        } catch(err) {
            res.json(err);
        }
    }
}

export default new BannerController();