import { Types } from "mongoose";

export interface IFCategory {
    name: string
}

export interface IFSubCategory {
    name: string
    _category : Types.ObjectId
}

export interface IFProduct {
    _category : Types.ObjectId
    _subcategory : Types.ObjectId,
    typeProduct : String,
    slug ?: String,
    title : String,
    headline ?: String,
    description ?: String,
    details ?: JSON,
    price : Number,
    cover ?: String,
    views ?: Number,
    sales ?: Number,
    freeViews ?: Number,
    freeSales ?: Number,
    offeredByCategory ?: Number,
    offeredBySubCategory ?: Number,
    offer ?: Number,
    offerPrice ?: Number,
    offerDiscount ?: Number,
    offerCover ?: String,
    offerEnd ?: Date,
    newProduct ?: Number,
    weight ?: Number,
    delivery ?: Number,
    updatet_at ?: Date,
    created_at ?: Date
}

export interface IFSlide {
    backImage ?: string,
    typeSlide ?: String,
    imgProduct ?: String,
    styleImgProduct : any,
    styleText : any,
    titleOne ?: String,
    titleTwo ?: String,
    titleThree ?: String,
    button ?: Boolean,
    url ?: String,
    updated_at ?: Date,
    created_at ?: Date
}

export interface IFTemplate {
    topBar : String,
    textBar : String,
    backColor : String,
    textColor : String,
    logo : String,
    icon : String,
    socialNetwork ?: JSON,
    updated_at ?: Date,
} 
