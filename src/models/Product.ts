import { Schema, model, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import { NextFunction } from 'express';
import slugify from '../plugins/slugify';

let productSchema = new Schema({
    _category : {
        type : Types.ObjectId,
        ref : 'Category',
        required: true,
    },
    _subcategory : {
        type : Types.ObjectId,
        ref : 'SubCategory',
        required : true
    },
    typeProduct : {
        type : String,
        enum : ['physical', 'virtual'],
        required : true
    },
    slug : {
        type : String,
        unique : true
    },
    title : {
        type : String,
        required : true
    },
    headline : String,
    description : String,
    details : JSON,
    price :{
        type : Number,
        required : true,
    },
    cover : String,
    views : {
        type : Number,
        default : 0
    },
    sales : {
        type : Number,
        default : 0
    },
    freeViews : {
        type : Number,
        default : 0
    },
    freeSales : {
        type : Number,
        default : 0
    },
    offeredByCategory : Number,
    offeredBySubCategory : Number,
    offer : {
        type : Number,
        enum : [0,1]
    },
    offerPrice : Number,
    offerDiscount : Number,
    offerCover : String,
    offerEnd : Date,
    newProduct : {
        type : Number,
        enum : [0,1]
    },
    weight : Number,
    delivery : Number,
    updatet_at : Date,
    created_at : {
        type : Date,
        default : Date.now
    }
})

// Functions 

async function generateSlugAndContinue(this: any, count: number, next: NextFunction) : Promise<void> {
    this.slug = slugify(this.title);
    
    if(count != 0) {
        this.slug = this.slug + '-' + count;
    }

    const isValid : boolean = await (Product as any).validateSlugCount(this.slug);

    if(!isValid) return generateSlugAndContinue.call(this, count + 1, next);
    return next(); 
}

// Pre
productSchema.pre('save', function (next : NextFunction){
    if((this as any).slug) return next();    
    generateSlugAndContinue.call(this, 0, next);
})

// Method Static
productSchema.statics.validateSlugCount = (slug : string) => { 
    return Product.countDocuments({slug})
            .then(count => {
                if(count > 0) return false;
                return true;
            })
}

// Plugins
productSchema.plugin(mongoosePaginate);

const Product = model('Product', productSchema);

export default Product;