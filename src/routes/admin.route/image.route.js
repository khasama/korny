const express = require("express");
const router = express.Router();
const { ImageController } = require("../../controllers/admin.controller");


router.get("/deleted", ImageController.deletedImages);
router.put("/restore/:id", ImageController.restoreImage);
router.get("/", ImageController.imagePage);
router.delete("/delete", ImageController.deleteImage);
router.delete("/:id", ImageController.softDeleteImage);

module.exports = router;