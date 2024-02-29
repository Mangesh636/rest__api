import express from "express";

import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middleware";

/**
 * This code snippet exports a function that sets up user-related routes on the provided Express router.
 * It defines routes for getting all users, deleting a user by ID, and updating a user by ID.
 * Middleware functions `isAuthenticated` and `isOwner` are used to protect delete and update routes.
 */
export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.put("/users/:id", isAuthenticated, isOwner, updateUser);
};
