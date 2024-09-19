const dbQueries = require("../db/queries");
const asyncHandler = require("express-async-handler");

const TABLE_NAME = "genre";

const genreList = asyncHandler(async (req, res) => {
  const allGenres = await dbQueries.findAll(TABLE_NAME);
  res.send({ code: 200, genres: allGenres });
});

const genreDetail = asyncHandler(async (req, res) => {
  const genre = await dbQueries.findOne(TABLE_NAME, "id", req.params.id);
  res.send({ status: 200, genre });
});

const createGenre = asyncHandler(async (req, res) => {
  req.body.id = dbQueries.createId();
  const createdGenre = await dbQueries.insertRecord(TABLE_NAME, req.body);
  res.send({ status: 200, createdGenre });
});

const updateGenre = asyncHandler(async (req, res) => {
  const updatedGenre = await dbQueries.updateRecord(
    TABLE_NAME,
    req.body,
    "id",
    req.params.id
  );
  res.send({
    status: 200,
    updatedGenre,
    message: "Updated Successfully",
  });
});

const deleteGenre = asyncHandler(async (req, res) => {
  const relatedGames = await dbQueries.find("game", "genre", req.params.id);

  const deletedGenre = await dbQueries.deleteRecord(
    TABLE_NAME,
    "id",
    req.params.id
  );

  if (deletedGenre) {
    res.send({
      status: 200,
      deletedGenre,
      relatedGames,
      message: "Deleted Successfully",
    });
  } else throw new Error("Error Deleting Genre");
});

module.exports = {
  genreList,
  genreDetail,
  createGenre,
  updateGenre,
  deleteGenre,
};
