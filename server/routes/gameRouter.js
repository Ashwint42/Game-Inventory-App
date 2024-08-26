const router = require("express").Router();

const gameController = require("../controllers/gameController");

//GET details of all games
router.get("/", gameController.gameList);

//GET request to create game
router.get("/create", gameController.createGameGet);

//POST request to create game
router.post("/create", gameController.createGamePost);

//GET request to update game
router.get("/update/:id", gameController.updateGameGet);

//POST request to update game
router.post("/update/:id", gameController.updateGamePost);

//GET request to update game
router.get("/delete/:id", gameController.deleteGameGet);

//POST request to update game
router.post("/delete/:id", gameController.deleteGamePost);

//Get detail of one game
router.get("/:id", gameController.gameDetail);

module.exports = router;
