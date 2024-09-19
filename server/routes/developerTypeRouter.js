const router = require("express").Router();

const developerTypeController = require("../controllers/developerTypeController");

//GET details of all developerTypes
router.get("/", developerTypeController.developerTypeList);

//POST request to create developerType
router.post("/create", developerTypeController.createDeveloperType);

//POST request to update developerType
router.post("/update/:id", developerTypeController.updateDeveloperType);

//POST request to update developerType
router.post("/delete/:id", developerTypeController.deleteDeveloperType);

//Get detail of one developerType
router.get("/:id", developerTypeController.developerTypeDetail);

module.exports = router;
