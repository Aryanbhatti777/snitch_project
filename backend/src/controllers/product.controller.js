import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";


export const addProduct = async (req, res) => {

    try {
        
        const { title, description, price, sizes } = req.body;

        const imageResult = await Promise.all(req.files.map(item => uploadFile({
            buffer: item.buffer,
            fileName: item.originalname
        })))

        const images = imageResult.map(item => item.url)

        const product = await productModel.create({
            title,
            description,
            images,
            price,
            sizes,
            seller: req.user.id
        })

        return res.status(201).json({
            message: "Product created successfully",
            product
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}