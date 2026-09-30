import Router from 'express'
import { loginValidation, registerValidation } from '../validations/auth.validation.js';
import { Login, Register } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post("/register", registerValidation, Register);
authRouter.post('/login', loginValidation, Login)

export default authRouter;