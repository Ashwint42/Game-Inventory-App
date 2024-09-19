const router = require("express").Router();

const platformController = require("../controllers/platformController");

//GET details of all platforms
router.get("/", platformController.platformList);

//POST request to create platform
router.post("/create", platformController.createPlatform);

//POST request to update platform
router.post("/update/:id", platformController.updatePlatform);

//POST request to update platform
router.post("/delete/:id", platformController.deletePlatform);

//Get detail of one platform
router.get("/:id", platformController.platformDetail);

module.exports = router;
