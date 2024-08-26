const router = require("express").Router();

const categoryController = require("../controllers/categoryController");

//GET details of all categorys
router.get("/", categoryController.categoryList);

//GET request to create category
router.get("/create", categoryController.createCategoryGet);

//POST request to create category
router.post("/create", categoryController.createCategoryPost);

//GET request to update category
router.get("/update/:id", categoryController.updateCategoryGet);

//POST request to update category
router.post("/update/:id", categoryController.updateCategoryPost);

//GET request to update category
router.get("/delete/:id", categoryController.deleteCategoryGet);

//POST request to update category
router.post("/delete/:id", categoryController.deleteCategoryPost);

//Get detail of one category
router.get("/:id", categoryController.categoryDetail);

module.exports = router;
