const express = require("express");
const moviesController = require("../controllers/movies");
const router = express.Router();

router.get("/:tconst", moviesController.getMovieById);

router.get("/:tconst/details", moviesController.getMovieDetailsById);

router.get("/:nconst/:category", moviesController.findMovieMatch);

module.exports = router;
