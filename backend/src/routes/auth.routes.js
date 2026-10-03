import Router from 'express'
import { loginValidation, registerValidation } from '../validations/auth.validation.js';
import { getMe, Login, Refresh, Register } from '../controllers/auth.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post("/register", registerValidation, Register);
authRouter.post('/login', loginValidation, Login)
authRouter.post("/refresh", Refresh);
authRouter.get("/getMe",authenticateUser, getMe)
export default authRouter;