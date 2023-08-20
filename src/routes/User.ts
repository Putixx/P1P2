import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.get('/:userId', controller.readUser);
router.get('/', controller.readAll);

export = router;