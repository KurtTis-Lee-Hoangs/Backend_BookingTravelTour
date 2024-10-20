import express from 'express'
import {deleteAccount, getAllAccount, SignIn, SignUp } from '../controllers/account.Controller.js'

const router = express.Router()

//user sign up
router.post('/sign-up', SignUp)
//get all user
router.get('/', getAllAccount)
//create account admin
// router.post('/admin/create-account', createAccount)
//delete account
router.delete('/:id', deleteAccount)

router.put('/:id')

export default router;