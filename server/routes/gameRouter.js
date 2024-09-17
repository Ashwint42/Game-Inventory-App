const router = require("express").Router();

const gameController = require("../controllers/gameController");

//GET details of all games
router.get("/", gameController.gameList);

//POST request to create game
router.post("/create", gameController.createGame);

//POST request to update game
router.post("/update/:id", gameController.updateGame);

//POST request to update game
router.post("/delete/:id", gameController.deleteGame);

//Get detail of one game
router.get("/:id", gameController.gameDetail);

module.exports = router;
