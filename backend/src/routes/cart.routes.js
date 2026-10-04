import Router from 'express'
import { addToCart } from '../controllers/cart.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const cartRouter = Router();

cartRouter.post("/add",authenticateUser, addToCart)

export default cartRouter;