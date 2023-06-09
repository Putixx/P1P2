import express from 'express';
import controller from '../controllers/Auth';
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);

export = router;