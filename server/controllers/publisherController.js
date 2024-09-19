const dbQueries = require("../db/queries");
const asyncHandler = require("express-async-handler");

const TABLE_NAME = "publisher";

const publisherList = asyncHandler(async (req, res) => {
  const allPublishers = await dbQueries.findAll(TABLE_NAME);
  res.send({ code: 200, publishers: allPublishers });
});

const publisherDetail = asyncHandler(async (req, res) => {
  const publisher = await dbQueries.find(TABLE_NAME, "id", req.params.id);
  res.send({ status: 200, publisher });
});

const createPublisher = asyncHandler(async (req, res) => {
  req.body.id = dbQueries.createId();
  const createdPublisher = await dbQueries.insertRecord(TABLE_NAME, req.body);
  res.send({ status: 200, createdPublisher });
});

const updatePublisher = asyncHandler(async (req, res) => {
  const updatedPublisher = await dbQueries.updateRecord(
    TABLE_NAME,
    req.body,
    "id",
    req.params.id
  );
  res.send({
    status: 200,
    updatedPublisher,
    message: "Updated Successfully",
  });
});

const deletePublisher = asyncHandler(async (req, res) => {
  const relatedGames = await dbQueries.findOne(
    "game",
    "publisher",
    req.params.id
  );

  const deletedPublisher = await dbQueries.deleteRecord(
    TABLE_NAME,
    "id",
    req.params.id
  );

  if (deletedPublisher) {
    res.send({
      status: 200,
      deletedPublisher,
      relatedGames,
      message: "Deleted Successfully",
    });
  } else throw new Error("Error Deleting Publisher");
});

module.exports = {
  publisherList,
  publisherDetail,
  createPublisher,
  updatePublisher,
  deletePublisher,
};
