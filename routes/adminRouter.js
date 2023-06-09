const express = require("express");
const router = express.Router();
const {
  adminHome,
  adminLogin,
  login,
  logOut,
  getEditUser,
  editUser,
  deleteUser,
  searchUser,
  createUser,
  getCreateUser,
  upload,
} = require("../controller/adminController");

router.get("/", adminHome);
router.get("/adminLogin", adminLogin);

router.post("/adminLogin", login);
router.get("/logOut", logOut);

router.get("/edit/:id", getEditUser);
router.post("/edit-user", upload, editUser);
router.get("/delete-user/:id", deleteUser);
router.post("/search-user", searchUser);
router.get("/create-user", getCreateUser);
router.post("/create-users", upload, createUser);

module.exports = router;
