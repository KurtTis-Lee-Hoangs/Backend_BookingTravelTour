import { deleteUser, getAllUser, getOneUser, updateUser, forgotPasswordCtrl, resetPasswordCtrl} from "../controllers/user.Controller.js";
import express from 'express'

const router = express.Router()

//get all user
router.get('/', getAllUser)
//get one user
router.get('/:id', getOneUser)
//create a user
// router.post('/register', createUser)
//update a user
router.put('/:id', updateUser)
//delete a user
router.delete('/:id', deleteUser)
router.post('/forgot-password', forgotPasswordCtrl)
router.get('/reset-password/:token', resetPasswordCtrl);

export default router;