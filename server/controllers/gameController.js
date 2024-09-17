const { createId } = require("../db/queries");
const dbQueries = require("../db/queries");
const asyncHandler = require("express-async-handler");

const TABLE_NAME = "game";

const gameList = asyncHandler(async (req, res) => {
  const allGames = await dbQueries.findAll(TABLE_NAME);
  res.send({ data: allGames.rows, length: allGames.rowCount, code: 200 });
});

const gameDetail = asyncHandler(async (req, res) => {
  const game = await dbQueries.findOne(TABLE_NAME, "id", req.params.id);

  if (game.rows.length !== 0)
    res.send({ code: 200, data: game.rows[0], msg: "Success" });

  res.send({ code: 404, msg: "Not Found" });
});

const createGame = asyncHandler(async (req, res) => {
  req.body.id = createId();
  const newGame = await dbQueries.insertRecord(TABLE_NAME, req.body);
  res.send({ code: 200, data: newGame, message: "Game Added Successfully" });
});

const updateGame = asyncHandler(async (req, res) => {
  const updatedRecord = await dbQueries.updateRecord(
    TABLE_NAME,
    req.body,
    "id",
    req.params.id
  );
  res.send({
    status: 200,
    data: updatedRecord,
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
    code: 200,
    data: deletedGame.rows[0],
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
