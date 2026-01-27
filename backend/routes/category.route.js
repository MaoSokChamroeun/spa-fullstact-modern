const express = require('express')
const { getAllCategory, createCategory, findCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/category.controller');
const { restricGuard } = require('../guard/restric.guard');
const CategoryRouter = express.Router();

CategoryRouter.route('/')
    .get(restricGuard("admin"), getAllCategory)
    .post(restricGuard("admin"), createCategory)

CategoryRouter.route('/:id')
    .get(restricGuard("admin"), findCategoryById)
    .put(restricGuard("admin"), updateCategoryById)
    .delete(restricGuard("admin"), deleteCategoryById);
module.exports = CategoryRouter