const express = require("express");
const router = express.Router();
const { FanpageController } = require("../../controllers/admin.controller");

router.get("/:id", FanpageController.imagesOfFanpage);
router.post("/", FanpageController.addFanpage);
router.delete("/:id", FanpageController.deleteFanpage);
router.get("/", FanpageController.fanpagePage);

module.exports = router;