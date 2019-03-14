import { Request, Response, NextFunction } from 'express';

import Slide from '../models/Slide';
import buildParams from '../plugins/buildParams';
import { IFSlide } from '../config/interfaces';

class SlideController {
    private slide : any;
    private validParams : string[];

    constructor(){
        this.validParams = ['backImage', 'typeSlide', 'imgProduct', 'styleImgProduct', 'styleText', 'titleOne', 'titleTwo', 'titleThree','button', 'url'];

        this.find = this.find.bind(this);
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        this.show = this.show.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);

    }

    find(req : Request, res : Response, next : NextFunction){
        Slide.findById(req.params.id)
        .then(doc => {
            this.slide = doc;
            next();
        })
        .catch(err => res.json(err))
    }

    index(req : Request, res : Response){
        Slide.paginate({},{
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 5,
            sort: {'_id': -1}
        })
        .then(docs => res.json(docs))
        .catch(console.log)
    }

    async create(req : Request, res : Response){
        const params : IFSlide = buildParams(this.validParams, req.body);
        
        try {
            const doc = await Slide.create(params);
            res.json(doc);
        } catch(err) {
            res.json(err);
        }
    }

    show(req : Request, res : Response){
        res.json(this.slide);
    }

    async update(req : Request, res : Response){
        const params : IFSlide = buildParams(this.validParams, req.body);

        this.slide = Object.assign(this.slide, params);
        this.slide.updated_at = new Date();

        try {
            const doc = await this.slide.save();
            res.json({
                message : 'update saccesful',
                doc
            })
        } catch(err) {
            res.json(err);
        }

    }

    async destroy(req : Request, res : Response){
        try {
            const doc = await this.slide.remove();
            res.json({
                message : 'delete saccesful',
                doc
            })
        } catch(err) {
            res.json(err);
        }
    }
}

export default new SlideController();