import Router from 'express'
import { addProduct } from '../controllers/product.controller.js';
import upload from '../configs/multer.config.js';
import { addProductValidation } from '../validations/product.validation.js';
import { authenticateSeller, authenticateUser } from '../middlewares/auth.middleware.js';
import { convertToJson } from '../middlewares/product.middleware.js';

const productRouter = Router();

productRouter.post(
    "/add",
    authenticateUser,
    authenticateSeller,
    upload.array("images"),
    convertToJson,
    addProductValidation,
    addProduct)

export default productRouter