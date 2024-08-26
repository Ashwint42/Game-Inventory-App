const router = require("express").Router();

const developerTypeController = require("../controllers/developerTypeController");

//GET details of all developerTypes
router.get("/", developerTypeController.developerTypeList);

//GET request to create developerType
router.get("/create", developerTypeController.createDeveloperTypeGet);

//POST request to create developerType
router.post("/create", developerTypeController.createDeveloperTypePost);

//GET request to update developerType
router.get("/update/:id", developerTypeController.updateDeveloperTypeGet);

//POST request to update developerType
router.post("/update/:id", developerTypeController.updateDeveloperTypePost);

//GET request to update developerType
router.get("/delete/:id", developerTypeController.deleteDeveloperTypeGet);

//POST request to update developerType
router.post("/delete/:id", developerTypeController.deleteDeveloperTypePost);

//Get detail of one developerType
router.get("/:id", developerTypeController.developerTypeDetail);

module.exports = router;
