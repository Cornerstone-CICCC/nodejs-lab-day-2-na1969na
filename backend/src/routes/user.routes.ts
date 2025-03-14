import { Router } from 'express';
import UserModel from '../models/user.model';
import UserController from '../controllers/user.controller';

const router = Router();
const userModel = new UserModel();
const userController = new UserController(userModel);

router.post('/signup', userController.addUser.bind(userController));
router.post('/login', userController.loginUser.bind(userController));
router.get('/logout', userController.logout.bind(userController));
router.get('/check-auth', userController.getUserByUsername.bind(userController));

export default router;
