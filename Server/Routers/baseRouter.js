const express = require("express");
const router = express.Router();
const baseController = require("../Controllers/baseController");
const auth = require('../Middleware/auth')

router.post("/submitSignup",baseController.submitSignup);
router.post("/submitlogin",baseController.submitLogin);
router.get("/homePageListing",auth.verifyToken,baseController.homePageListing);
router.get("/getChatMessages",auth.verifyToken,baseController.getChatMessages);
router.delete("/deleteDiscussion",baseController.deleteDiscussion );

module.exports = router