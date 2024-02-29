import { login, register } from "../controllers/authentication";
import express from "express";

/**
 * This code snippet exports a function that sets up authentication routes on the provided Express router.
 * It registers POST routes for user registration and login, using the `register` and `login` controller functions.
 */
export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
