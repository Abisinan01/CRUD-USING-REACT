import express from "express"
import SignUpForm from "../controllers/authController/signupController"
import { isAuthenticated, LoginForm } from "../controllers/authController/loginController"
import { Logout } from "../controllers/authController/logout"
const router = express.Router()


router.post('/sign-up-form', SignUpForm)
router.post('/login-form', LoginForm)
router.get('/authenticated', isAuthenticated)
router.post('/logout', Logout)
export default router