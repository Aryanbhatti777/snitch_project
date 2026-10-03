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

export const getProductsForUser = async (req, res) => {

    const products = await productModel.find({ published: true });

    if (!products) {
        return res.status(404).json({
            message: "Products not found"
        })
    }

    return res.status(200).json({
        message: products.length ? "Products fetched successfully" : "No products added",
        products
    })
}

export const publishProduct = async (req, res) => {
    
    try {
        
        const id = req.params.id;

        const updated = await productModel.findByIdAndUpdate(id, {
            published: true
        }, { new: true })

        if (!updated) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        return res.status(200).json({
            message: "Product published successfully",
            updated
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const unPublishProduct = async (req, res) => {
    
    try {
        
        const id = req.params.id;

        const updated = await productModel.findByIdAndUpdate(id, {
            published: false
        }, { new: true })

        if (!updated) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        return res.status(200).json({
            message: "Product un-published successfully",
            updated
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getProductsForSeller = async (req, res) => {

    const products = await productModel.find();

    if (!products) {
        return res.status(404).json({
            message: "Products not found"
        })
    }

    return res.status(200).json({
        message: products.length ? "Products fetched successfully" : "No products added",
        products
    })
}