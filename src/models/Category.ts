'use strict'

import { NextFunction } from 'express';
import { Schema, model } from 'mongoose';
import slugify from '../plugins/slugify';
import mongoosePaginate from 'mongoose-paginate';
import SubCategory from './SubCategory';
import { json } from 'body-parser';
import { log } from 'util';

let categorySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    updatet_at : Date,
    created_at : {
        type : Date,
        default : Date.now
    }
});

categorySchema.virtual('SubCategories').get(function(this :any){
    return SubCategory.find({_category : this._id})
    .then(res => {        
        const json = {
            ...this._doc,
            sub : res
        }
        //console.log(this._doc);
        
        //console.log(json);
        
        return json;

    });
})





// Functions 

async function generateSlugAndContinue(this: any, count: number, next: NextFunction) : Promise<void> {
    this.slug = slugify(this.name);
    
    if(count != 0) {
        this.slug = this.slug + '-' + count;
    }

    const isValid : boolean = await (Category as any).validateSlugCount(this.slug);

    if(!isValid) return generateSlugAndContinue.call(this, count + 1, next);
    return next(); 
}

// Pre
categorySchema.pre('save', function (next){
    if((this as any).slug) return next();    
    generateSlugAndContinue.call(this, 0, next);
})

// Method Static
categorySchema.statics.validateSlugCount = (slug : string) => { 
    return Category.countDocuments({slug})
            .then(count => {
                if(count > 0) return false;
                return true;
            })
}

// Plugins
categorySchema.plugin(mongoosePaginate);

const Category = model('Category', categorySchema);

export default Category;

class GenerateSlug {
    constructor(model : any){
        model.find();
    }
}