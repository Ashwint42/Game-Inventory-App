const router = require("express").Router();

const developerController = require("../controllers/developerController");

//GET details of all developers
router.get("/", developerController.developerList);

//GET request to create developer
router.get("/create", developerController.createDeveloperGet);

//POST request to create developer
router.post("/create", developerController.createDeveloperPost);

//GET request to update developer
router.get("/update/:id", developerController.updateDeveloperGet);

//POST request to update developer
router.post("/update/:id", developerController.updateDeveloperPost);

//GET request to update developer
router.get("/delete/:id", developerController.deleteDeveloperGet);

//POST request to update developer
router.post("/delete/:id", developerController.deleteDeveloperPost);

//Get detail of one developer
router.get("/:id", developerController.developerDetail);

module.exports = router;
