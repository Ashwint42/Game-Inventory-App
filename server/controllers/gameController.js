const dbQueries = require("../db/queries");
const asyncHandler = require("express-async-handler");

const TABLE_NAME = "game";

const gameList = asyncHandler(async (req, res) => {
  const allGames = await dbQueries.findAll(TABLE_NAME);
  res.send({ games: allGames, status: 200 });
});

const gameDetail = asyncHandler(async (req, res) => {
  const game = await dbQueries.findOne(TABLE_NAME, "id", req.params.id);

  if (game) res.send({ status: 200, game, msg: "Success" });
  else res.send({ status: 404, msg: "Not Found" });
});

const createGame = asyncHandler(async (req, res) => {
  req.body.id = dbQueries.createId();
  const newGame = await dbQueries.insertRecord(TABLE_NAME, req.body);
  res.send({ status: 200, newGame, message: "Game Added Successfully" });
});

const updateGame = asyncHandler(async (req, res) => {
  const updatedGame = await dbQueries.updateRecord(
    TABLE_NAME,
    req.body,
    "id",
    req.params.id
  );
  res.send({
    status: 200,
    updatedGame,
    message: "Updated Successfully",
  });
});

const deleteGame = asyncHandler(async (req, res) => {
  const deletedGame = await dbQueries.deleteRecord(
    TABLE_NAME,
    "id",
    req.params.id
  );
  res.send({
    status: 200,
    deletedGame,
    message: "Deleted Successfully",
  });
});

module.exports = {
  gameList,
  gameDetail,
  createGame,
  updateGame,
  deleteGame,
};
