import express from "express";
import authentication from "./authentication";
import users from "./users";

/**
 * This code snippet exports a function that configures routes on an Express router.
 * It includes routes for authentication and user-related operations by calling the `authentication` and `users` functions.
 * The function returns the configured router.
 */
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  return router;
};
