const router = require("express").Router();

const platformController = require("../controllers/platformController");

//GET details of all platforms
router.get("/", platformController.platformList);

//GET request to create platform
router.get("/create", platformController.createPlatformGet);

//POST request to create platform
router.post("/create", platformController.createPlatformPost);

//GET request to update platform
router.get("/update/:id", platformController.updatePlatformGet);

//POST request to update platform
router.post("/update/:id", platformController.updatePlatformPost);

//GET request to update platform
router.get("/delete/:id", platformController.deletePlatformGet);

//POST request to update platform
router.post("/delete/:id", platformController.deletePlatformPost);

//Get detail of one platform
router.get("/:id", platformController.platformDetail);

module.exports = router;
