const router = require("express").Router();

const developerController = require("../controllers/developerController");

//GET details of all developers
router.get("/", developerController.developerList);

//POST request to create developer
router.post("/create", developerController.createDeveloper);

//POST request to update developer
router.post("/update/:id", developerController.updateDeveloper);

//POST request to update developer
router.post("/delete/:id", developerController.deleteDeveloper);

//Get detail of one developer
router.get("/:id", developerController.developerDetail);

module.exports = router;
