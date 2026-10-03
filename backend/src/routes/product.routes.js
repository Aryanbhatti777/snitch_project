import Router from "express";
import { addProduct, getProductsForSeller, getProductsForUser, publishProduct, unPublishProduct } from "../controllers/product.controller.js";
import upload from "../configs/multer.config.js";
import { addProductValidation, paramValidationforPublish } from "../validations/product.validation.js";
import {
  authenticateSeller,
  authenticateUser,
} from "../middlewares/auth.middleware.js";
import { convertToJson } from "../middlewares/product.middleware.js";

const productRouter = Router();

productRouter.post(
  "/add",
  authenticateUser,
  authenticateSeller,
  upload.array("images"),
  convertToJson,
  addProductValidation,
  addProduct,
);

productRouter.get("/userProducts", getProductsForUser);

productRouter.post("/publishProduct/:id", authenticateUser, authenticateSeller, paramValidationforPublish, publishProduct)

productRouter.post("/unPublishProduct/:id", authenticateUser, authenticateSeller, paramValidationforPublish, unPublishProduct)

productRouter.get("/sellerProducts", authenticateUser, authenticateSeller, getProductsForSeller)

export default productRouter;
