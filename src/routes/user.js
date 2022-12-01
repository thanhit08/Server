var express = require('express');
var router = express.Router();
const user = require('../controllers/user')
router.post('/api/userCheckExists', [user.userCheckExists]);

module.exports = router;