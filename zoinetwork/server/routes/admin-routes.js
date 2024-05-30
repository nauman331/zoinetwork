const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin-controller")
const authenticate = require("../middlewares/authenticate-middleware");


router.route('/users').get(authenticate, adminControllers.getAllUsers);
router.route('/contacts').get(authenticate, adminControllers.getAllContacts);
router.route("/users/delete/:id").post(authenticate, adminControllers.deleteUserById);
router.route("/contacts/delete/:id").post(authenticate, adminControllers.deleteContactById);



module.exports = router;