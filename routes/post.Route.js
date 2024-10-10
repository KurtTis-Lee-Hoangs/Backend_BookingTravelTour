import express from 'express'
import { createPost, getAllPosts, getPost, deletePost, updatePost } from '../controllers/posts.Controller.js'

const router = express.Router()

//create a post
router.post('/create-post', createPost)
//get all posts
router.get('/', getAllPosts)
//get post
router.get('/:id', getPost)
//delete post
router.delete('/delete/:id', deletePost)
//update post
router.put('/update/:id', updatePost)

export default router;