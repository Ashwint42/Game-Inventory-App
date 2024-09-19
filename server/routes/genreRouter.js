const router = require("express").Router();

const genreController = require("../controllers/genreController");

//GET details of all genres
router.get("/", genreController.genreList);

//POST request to create genre
router.post("/create", genreController.createGenre);

//POST request to update genre
router.post("/update/:id", genreController.updateGenre);

//POST request to update genre
router.post("/delete/:id", genreController.deleteGenre);

//Get detail of one genre
router.get("/:id", genreController.genreDetail);

module.exports = router;
