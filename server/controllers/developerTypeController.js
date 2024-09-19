const dbQueries = require("../db/queries");
const asyncHandler = require("express-async-handler");

const TABLE_NAME = "developer_type";

const developerTypeList = asyncHandler(async (req, res) => {
  const allDeveloperTypes = await dbQueries.findAll(TABLE_NAME);
  res.send({ code: 200, developerTypes: allDeveloperTypes });
});

const developerTypeDetail = asyncHandler(async (req, res) => {
  const developerType = await dbQueries.findOne(
    TABLE_NAME,
    "id",
    req.params.id
  );
  res.send({ status: 200, developerType });
});

const createDeveloperType = asyncHandler(async (req, res) => {
  req.body.id = dbQueries.createId();
  const createdDeveloperType = await dbQueries.insertRecord(
    TABLE_NAME,
    req.body
  );
  res.send({ status: 200, createdDeveloperType });
});

const updateDeveloperType = asyncHandler(async (req, res) => {
  const updatedDeveloperType = await dbQueries.updateRecord(
    TABLE_NAME,
    req.body,
    "id",
    req.params.id
  );
  res.send({
    status: 200,
    updatedDeveloperType,
    message: "Updated Successfully",
  });
});

const deleteDeveloperType = asyncHandler(async (req, res) => {
  const relatedDevelopers = await dbQueries.find(
    "developer",
    "developer_type",
    req.params.id
  );

  const relatedGames = await Promise.all(
    relatedDevelopers.map(async (developer) => {
      return await dbQueries.find("game", "developer", developer.id);
    })
  );

  const deletedDeveloperType = await dbQueries.deleteRecord(
    TABLE_NAME,
    "id",
    req.params.id
  );

  console.log(relatedGames);

  if (deletedDeveloperType) {
    res.send({
      status: 200,
      deletedDeveloperType,
      relatedDevelopers,
      relatedGames,
      message: "Deleted Successfully",
    });
  } else throw new Error("Error Deleting DeveloperType");
});

module.exports = {
  developerTypeList,
  developerTypeDetail,
  createDeveloperType,
  updateDeveloperType,
  deleteDeveloperType,
};
