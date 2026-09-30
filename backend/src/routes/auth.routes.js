import Router from 'express'
import { registerValidation } from '../validations/auth.validation.js';
import { Register } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post("/register", registerValidation, Register)

export default authRouter;