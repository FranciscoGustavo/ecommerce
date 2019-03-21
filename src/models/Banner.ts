import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

let bannerSchema = new Schema({
    route : String,
    image : String,
    titleOne : String,
    titleTwo : String,
    titleThree : String,
    style : String,
    updated_at : Date,
    created_at : {
        type : Date,
        default : Date.now
    }
})

bannerSchema.plugin(mongoosePaginate);

const Banner = model('Banner', bannerSchema);

export default Banner;