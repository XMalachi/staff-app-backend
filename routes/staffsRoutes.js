import express from "express";
const router = express.Router()
import { getStaff, createStaff, loginStaff } from "../controllers/staffsController.js";
import { authorizeStaff, Protect } from "../middleware/auth.js";


router.route('/').get(Protect, authorizeStaff("admin",), getStaff)
router.route('/register').post(createStaff)
router.route('/login').post(loginStaff)


export {router}