const express = require("express");
const router = express.Router();
const baseController = require("../Controllers/baseController");

router.post("/submitSignup",baseController.submitSignup);
router.post("/submitlogin",baseController.submitLogin);
router.get("/homePageListing",baseController.homePageListing);

module.exports = router