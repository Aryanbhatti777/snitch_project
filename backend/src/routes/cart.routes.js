import Router from 'express'
import { addToCart, getCart } from '../controllers/cart.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const cartRouter = Router();

cartRouter.post("/add", authenticateUser, addToCart);

cartRouter.get("/", authenticateUser, getCart)

export default cartRouter;