import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const socialNetworkSchema = new Schema({
    net : {
        type : String,
        required : true
    },
    style : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    }
})

let templateSchema = new Schema({
    topBar : {
        type : String,
        required : true
    },
    textBar : {
        type : String,
        required : true
    },
    backColor : {
        type : String,
        required : true
    },
    textColor : {
        type : String,
        required : true
    },
    logo : {
        type : String,
        required : true
    },
    icon : {
        type : String,
        required : true
    },
    socialNetwork : {
        type : [socialNetworkSchema],
        default : {}
    },
    updated_at : Date,
    created_at : {
        type : Date,
        default : Date.now
    }
});

templateSchema.plugin(mongoosePaginate);

const Template = model('template', templateSchema);

export default Template;