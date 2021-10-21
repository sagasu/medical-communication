import express from 'express';

import {signup, login} from '../controllers/auth.mjs'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/signup', signup);
router.get('/login', login);

export default router;