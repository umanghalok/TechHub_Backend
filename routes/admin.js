import {Router} from 'express';
import { fetchUser,deleteUser } from '../controllers/admin.controller.js';

const router= Router();

router.route('/users').get(fetchUser);//for fetching list of users
router.route(`/deleteUser/:id`).delete(deleteUser);//for deleting a particular user

export default router;
