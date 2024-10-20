import express from 'express'
import {deleteAccount, getAccount, getAllAccount, SignUp, updateAccount } from '../controllers/account.Controller.js'

const router = express.Router()

//user sign up
router.post('/sign-up', SignUp)
//get all user
router.get('/', getAllAccount)
//delete account
router.delete('/:id', deleteAccount)
//update account
router.put('/:id', updateAccount)
//get account
router.get('/:id', getAccount)

export default router;