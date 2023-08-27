import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.get('/:userId', controller.readUser);
router.get('/', controller.readAll);
router.patch('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);

export = router;