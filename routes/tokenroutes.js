const router = require('express').Router();

const tokenRoutes = require('..//Controllers/token');

router.route('/').get(tokenRoutes.getTokens).post(tokenRoutes.addToken);