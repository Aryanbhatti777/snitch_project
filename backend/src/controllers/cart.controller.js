import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCart = async (req, res) => {
    
    const { productId, quantity, size } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    const selectedSize = product.sizes.find(item => item.size === size)

    if (!selectedSize) {
        return res.status(400).json({
            message: "Invalid size"
        })
    }

    if (selectedSize.stock < quantity) {
        return res.status(400).json({
            message: "Out of stock"
        })
    }

    const cart = await cartModel.findOne({ user: req.user.id }) ?? await cartModel.create({ user: req.user.id });

    const productInCart = cart.products.find(p => (p.product.toString() === productId) && (p.size === size));
    
    if (productInCart) {
        
        if (productInCart.quantity + quantity > selectedSize.stock) {
            return res.status(400).json({
                message: "Out of stock"
            })
        }

        await cartModel.findOneAndUpdate({
            user: req.user.id,
            "products.product": productId,
            "products.size" : size
        }, {
            $inc: {
                "products.$.quantity": quantity
            }
        })

        return res.status(200).json({
            message: "Product quantity updated"
        })
    }

    await cartModel.findOneAndUpdate({
        user: req.user.id
    }, {
        $push: {
            products: {
                product: productId,
                quantity,
                size
            }
        }
    })

    return res.status(200).json({
        message: "Product added to cart."
    })

}

export const getCart = async (req, res) => {

    const cart = await cartModel.findOne({ user: req.user.id }) ?? await cartModel.create({ user: req.user.id })
    
    return res.status(200).json({
        message: "Cart fetched successfully",
        cart
    })
}