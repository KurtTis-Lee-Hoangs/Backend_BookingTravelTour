import express from 'express'
import { createAccount, getAllAccount, SignIn, SignUp } from '../controllers/account.Controller.js'

const router = express.Router()

//user sign up
router.post('/sign-up', SignUp)
//user sign in
router.get('/sign-in', SignIn)
//get all user
router.get('/accounts', getAllAccount)
//create account admin
router.post('/admin/create-account', createAccount)

export default router;