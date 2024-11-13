import { Router } from 'express'
import { UserController } from '../controllers/user'
import { validateUser } from '../middleware/validation'

export const userRouter = Router()
const userController = new UserController()

userRouter.get('/', userController.getUsers)
userRouter.post('/', validateUser, userController.createUser)
userRouter.get('/:id', userController.getUserById)
userRouter.put('/:id', validateUser, userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)