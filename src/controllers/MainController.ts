import { Request, Response } from 'express';
import Category  from '../models/Category';
import Slide from '../models/Slide';
import { IFSlide } from '../config/interfaces';

class MainController {
    static async index(req : Request, res : Response){
        let categories : any = [];
        let documents: any[] = [];
        
        
        categories = await Category.find()
        
        documents = categories.map((category : any) => {
            return category.SubCategories
        })
        

        Promise.all(documents).then(collection => {
            Slide.find().then(slide => {
                res.json({slide, collection});

            })
        })

        // console.log(documents);
        
        
        

        
    }

    static async slide(req : Request, res : Response) {
        const params : IFSlide = {
            backImage : "https://backend.tutorialesatualcance.com/vistas/img/slide/slide4/fondo3.jpg",
            imgProduct : "https://backend.tutorialesatualcance.com/vistas/img/slide/slide3/iphone.png",
            titleOne : "Audifonos Sony",
            titleTwo : "Maxima fidelidad",
            titleThree : "Resistentes al agua",
            button : true,
            typeSlide : 'right',
            url : "",
            styleImgProduct : {
                top : '10%',
                right : '10%',
                width : '40%'
            },
            styleText : {
                top : '10%',
                left : '10%',
                width : '40%'
            }
        } 
        try {
            const slide = await Slide.create(params);
            res.json(slide);
        } catch(err) {
            console.log(err);
            
        }
    }
}

export default MainController;