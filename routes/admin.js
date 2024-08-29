import {Router} from 'express';
import { fetchUser,deleteUser } from '../controllers/admin.controller.js';
import {authenticateToken} from "../middleware/jwt.middleware.js"
const router= Router();

router.route('/users').get(authenticateToken,fetchUser);//for fetching list of users
router.route(`/deleteUser/:id`).delete(authenticateToken,deleteUser);//for deleting a particular user

export default router;
