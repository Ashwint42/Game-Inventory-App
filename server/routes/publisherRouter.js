const router = require("express").Router();

const publisherController = require("../controllers/publisherController");

//GET details of all publishers
router.get("/", publisherController.publisherList);

//GET request to create publisher
router.get("/create", publisherController.createPublisherGet);

//POST request to create publisher
router.post("/create", publisherController.createPublisherPost);

//GET request to update publisher
router.get("/update/:id", publisherController.updatePublisherGet);

//POST request to update publisher
router.post("/update/:id", publisherController.updatePublisherPost);

//GET request to update publisher
router.get("/delete/:id", publisherController.deletePublisherGet);

//POST request to update publisher
router.post("/delete/:id", publisherController.deletePublisherPost);

//Get detail of one publisher
router.get("/:id", publisherController.publisherDetail);

module.exports = router;
