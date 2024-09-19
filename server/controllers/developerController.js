const dbQueries = require("../db/queries");
const asyncHandler = require("express-async-handler");

const TABLE_NAME = "developer";

const developerList = asyncHandler(async (req, res) => {
  const allDevelopers = await dbQueries.findAll(TABLE_NAME);
  res.send({ code: 200, developers: allDevelopers });
});

const developerDetail = asyncHandler(async (req, res) => {
  const developer = await dbQueries.findOne(TABLE_NAME, "id", req.params.id);
  res.send({ status: 200, developer });
});

const createDeveloper = asyncHandler(async (req, res) => {
  req.body.id = dbQueries.createId();
  const createdDeveloper = await dbQueries.insertRecord(TABLE_NAME, req.body);
  res.send({ status: 200, createdDeveloper });
});

const updateDeveloper = asyncHandler(async (req, res) => {
  const updatedDeveloper = await dbQueries.updateRecord(
    TABLE_NAME,
    req.body,
    "id",
    req.params.id
  );
  res.send({
    status: 200,
    updatedDeveloper,
    message: "Updated Successfully",
  });
});

const deleteDeveloper = asyncHandler(async (req, res) => {
  const relatedGames = await dbQueries.find("game", "developer", req.params.id);

  const deletedDeveloper = await dbQueries.deleteRecord(
    TABLE_NAME,
    "id",
    req.params.id
  );

  if (deletedDeveloper) {
    res.send({
      status: 200,
      deletedDeveloper,
      relatedGames,
      message: "Deleted Successfully",
    });
  } else throw new Error("Error Deleting Developer");
});

module.exports = {
  developerList,
  developerDetail,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
};
