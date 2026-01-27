const express = require("express");
const { getAllBanners, createBanner, findBannerById, updateBannerById, deleteBannerById } = require("../controllers/banner.controller");
const { uploadBannerFile } = require("../controllers/upload.controller");
const { restricGuard } = require("../guard/restric.guard");
const BannerRouter = express.Router();

BannerRouter.route("/")
    .get(restricGuard("admin"), getAllBanners)
    .post(restricGuard("admin"), uploadBannerFile, createBanner);

BannerRouter.route("/:id")
    .get(restricGuard("admin"), findBannerById)
    .put(restricGuard("admin"), uploadBannerFile, updateBannerById)
    .delete(restricGuard("admin"), deleteBannerById);
module.exports = BannerRouter;