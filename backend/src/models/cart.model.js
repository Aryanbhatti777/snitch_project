import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "products",
                required: true

            },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
                required: true,
            },
            size: {
                type: String,
                enum: ["XS", "S", "M", "L", "XL", "XXL"],
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    }
})

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;