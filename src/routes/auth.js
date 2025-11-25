const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateBody, registerSchema, loginSchema } = require('../middleware/validate');

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);

module.exports = router;
