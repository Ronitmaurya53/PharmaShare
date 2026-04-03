

import { Router } from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import uploadImageController from '../controllers/uploadImage.controller.js'

const uploadRouter = Router()

// ✅ Category Image Upload Route
uploadRouter.post('/', auth, upload.single('image'), uploadImageController)

export default uploadRouter
