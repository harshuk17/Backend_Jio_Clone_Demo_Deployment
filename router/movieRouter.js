// ********MOVIE ROUTE AND THERE HANDLER**************
const express = require("express");
const movieRouter = express.Router();

const {createMovie,getAllMovies,deleteMovie,getMovieById}=require("../controller/movieController");
const {protectedRouteMiddleware,isAdminMiddleware,allMoviesMiddleware}=require("../controller/authController");

movieRouter.post("/createMovie",createMovie);
movieRouter.get("/allMovies", protectedRouteMiddleware,allMoviesMiddleware,getAllMovies);
movieRouter.delete("/deleteMovie/:id",protectedRouteMiddleware,isAdminMiddleware,deleteMovie);
movieRouter.get("/movie/:id",getMovieById);

module.exports = movieRouter;