const router = require('express').Router();

const tokenRoutes = require('..//Controllers/token');

router.route('/token').get(tokenRoutes.getTokens);
router.route('/addtoken').post(tokenRoutes.addToken);

module.exports = router;
