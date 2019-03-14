import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const slideSchema = new Schema({
    backImage : String,
    typeSlide : {
        type : String,
        enum : ['left','right'],
        default : 'left'
    },
    imgProduct : String,
    styleImgProduct : {
        type : JSON,
        required : true
    },
    styleText : {
        type : JSON,
        required : true
    },
    titleOne : String,
    titleTwo : String,
    titleThree : String,
    button : Boolean,
    url : String,
    updated_at : Date,
    created_at : {
        type : Date,
        default : Date.now
    }
});

slideSchema.plugin(mongoosePaginate);

const Slide = model('Slide',slideSchema);

export default Slide;