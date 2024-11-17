import express from 'express'
import { login, signup } from '../Controllers/AuthController.mjs';
import { loginValidation, singupValidation } from '../Middlewares/AuthValidation.mjs';
let router = express.Router();


router.post('/login',loginValidation,login);
router.post('/signup',singupValidation,signup);

export default router;