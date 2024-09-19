const router = require("express").Router();

const publisherController = require("../controllers/publisherController");

//GET details of all publishers
router.get("/", publisherController.publisherList);

//POST request to create publisher
router.post("/create", publisherController.createPublisher);

//POST request to update publisher
router.post("/update/:id", publisherController.updatePublisher);

//POST request to update publisher
router.post("/delete/:id", publisherController.deletePublisher);

//Get detail of one publisher
router.get("/:id", publisherController.publisherDetail);

module.exports = router;
