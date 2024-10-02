import { createUser, deleteUser, getAllUser, getOneUser, updateUser } from "../controllers/user.Controller.js";
import express from 'express'

const router = express.Router()

//get all user
router.get('/users', getAllUser)
//get one user
router.get('/:id', getOneUser)
//create a user
router.post('/register', createUser)
//update a user
router.put('/:id', updateUser)
//delete a user
router.delete('/:id', deleteUser)

export default router