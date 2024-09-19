const dbQueries = require("../db/queries");
const asyncHandler = require("express-async-handler");

const TABLE_NAME = "platform";

const platformList = asyncHandler(async (req, res) => {
  const allPlatforms = await dbQueries.findAll(TABLE_NAME);
  res.send({ code: 200, platforms: allPlatforms });
});

const platformDetail = asyncHandler(async (req, res) => {
  const platform = await dbQueries.findOne(TABLE_NAME, "id", req.params.id);
  res.send({ status: 200, platform });
});

const createPlatform = asyncHandler(async (req, res) => {
  req.body.id = dbQueries.createId();
  const createdPlatform = await dbQueries.insertRecord(TABLE_NAME, req.body);
  res.send({ status: 200, createdPlatform });
});

const updatePlatform = asyncHandler(async (req, res) => {
  const updatedPlatform = await dbQueries.updateRecord(
    TABLE_NAME,
    req.body,
    "id",
    req.params.id
  );
  res.send({
    status: 200,
    updatedPlatform,
    message: "Updated Successfully",
  });
});

const deletePlatform = asyncHandler(async (req, res) => {
  const relatedGames = await dbQueries.find("game", "platform", req.params.id);

  const deletedPlatform = await dbQueries.deleteRecord(
    TABLE_NAME,
    "id",
    req.params.id
  );

  if (deletedPlatform) {
    res.send({
      status: 200,
      deletedPlatform,
      relatedGames,
      message: "Deleted Successfully",
    });
  } else throw new Error("Error Deleting Platform");
});

module.exports = {
  platformList,
  platformDetail,
  createPlatform,
  updatePlatform,
  deletePlatform,
};
