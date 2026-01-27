const express = require('express')
const {getAllPackage, createPackage, findPackageById , updatePackageById , deletePackage} = require('../controllers/package.controller');
const {uploadPackageFile} = require('../controllers/upload.controller');

const { restricGuard } = require('../guard/restric.guard');
const PackageRouter = express.Router();

PackageRouter.route('/')
            .get( restricGuard("admin") , getAllPackage)
            .post( restricGuard , uploadPackageFile ,createPackage)

PackageRouter.route('/:id')
            .get( restricGuard("admin") , findPackageById)
            .delete( restricGuard("admin") ,deletePackage)
            .put( restricGuard("admin") ,uploadPackageFile , updatePackageById)
module.exports = PackageRouter