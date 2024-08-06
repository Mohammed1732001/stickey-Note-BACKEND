import * as authContrller from "../auth/controller/auth.js"
import { Router } from "express";
import { validtion } from "../../middleware/validation.middleWare.js";
import * as validator from "../auth/validation.js";
const router = Router()

router.post('/signup', validtion(validator.signUp), authContrller.signUp)
router.post('/logIn', validtion(validator.login), authContrller.logIn)
router.get('/confirmEmail/:token', authContrller.confirmEmail)
router.get('/confirmEmail/resend/:token', authContrller.reFreshConfirmEmail)

export default router