'use stric'

import { Schema, model, Types } from 'mongoose';
import mongoosePaginate  from 'mongoose-paginate';
import slugify from '../plugins/slugify';
import { NextFunction } from 'connect';

let subCategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    _category: {
        type: Types.ObjectId,
        ref : 'Category',
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    updated_at : Date,
    created_at : {
        type : Date,
        default : Date.now
    }
});

// Functions 

async function generateSlugAndContinue(this : any, count : number, next : NextFunction) : Promise<void>{
    this.slug = slugify(this.name);
    
    if(count != 0) {
        this.slug = this.slug + '-' + count;
    }
    
    const isValid : boolean = await (SubCategory as any).validateSlugCount(this.slug)

    if(!isValid) return generateSlugAndContinue.call(this, count + 1, next);
    return next(); 
}

// Pre
subCategorySchema.pre('save', function (next){
    if((this as any).slug) return next();
    
    generateSlugAndContinue.call(this, 0, next);
})

// Method Static
subCategorySchema.statics.validateSlugCount = (slug : string) => {
    return SubCategory.countDocuments({slug})
            .then(count => {
                if(count > 0) return false;
                return true;
            })
}

// Plugins
subCategorySchema.plugin(mongoosePaginate);

const SubCategory = model('SubCategory', subCategorySchema);
export default SubCategory; 