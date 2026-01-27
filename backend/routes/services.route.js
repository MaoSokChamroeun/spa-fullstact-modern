const express = require('express');
const {
  getAllService,
  createServices,
  getServiceById,
  deleteServicesById,
  updateServiceById,
  getServiceByCategory
} = require('../controllers/services.controller');
const { uploadServiceFile } = require('../controllers/upload.controller');
const { restricGuard } = require('../guard/restric.guard');

const ServiceRouter = express.Router();

// 1. Static/Base Routes
ServiceRouter.route('/')
  .get(restricGuard("admin", "staff"), getAllService)
  .post(restricGuard("admin"), uploadServiceFile, createServices);

ServiceRouter.get('/category/:slug', getServiceByCategory);

// 3. ID Routes
ServiceRouter.route('/:id')
  .get(restricGuard("admin","staff"), getServiceById)
  .delete(restricGuard("admin"), deleteServicesById)
  .put(restricGuard("admin"), uploadServiceFile, updateServiceById);

module.exports = ServiceRouter;