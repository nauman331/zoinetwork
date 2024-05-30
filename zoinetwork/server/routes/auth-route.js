const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const signupSchema = require("../validators/register-validator");
const loginSchema = require("../validators/login-validator");
const authenticate = require("../middlewares/authenticate-middleware");

router.route('/').get(authControllers.home);
router.route('/register').post(validate(signupSchema), authControllers.register);
router.route('/login').post(validate(loginSchema), authControllers.login);
router.route('/user').get(authenticate, authControllers.user);
router.route('/updateCoins').post(authenticate, authControllers.updateCoins);
router.route('/claim-coins/:platform').post(authenticate, authControllers.claimSocialCoins);

module.exports = router;
