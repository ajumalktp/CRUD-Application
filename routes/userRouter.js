const express = require("express");
const router = express.Router();
const {
  getUserHome,
  getLogin,
  getSignup,
  userLogout,
  signUp,
  userLogin,
  getUserEdit,
  userEdit,
  upload,
} = require("../controller/userController");

router.get("/", getUserHome);
router.get("/login", getLogin);
router.get("/signUp", getSignup);
router.get("/logOut", userLogout);
router.get("/edit/:id", getUserEdit);

router.post("/login", userLogin);
router.post("/signUp", upload, signUp);
router.post("/edit-user", upload, userEdit);

module.exports = router;
