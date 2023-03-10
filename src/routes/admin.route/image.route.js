const express = require("express");
const router = express.Router();
const { ImageController } = require("../../controllers/admin.controller");


// router.post("/", ImageController.addImage);
// router.put("/:id", ImageController.updateImage);
router.delete("/:id", ImageController.deleteImage);
router.get("/", ImageController.imagePage);

module.exports = router;