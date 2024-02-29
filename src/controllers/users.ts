import express from "express";
import { deleteUserById, getUserById, getUsers } from "../actions/action";
import users from "router/users";

/**
 * @function getAllUsers
 * This function retrieves all users from the database.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object for sending back the result.
 * It fetches all users by calling the `getUsers` function.
 * If successful, it returns the list of users as a JSON response with a status of 200.
 * If an error occurs during the process, it logs the error and sends a status of 400.
 */
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * @function deleteUser
 * This function deletes a user from the database based on the provided user ID.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object for sending back the result.
 * It extracts the user ID from the request parameters.
 * It deletes the user by calling the `deleteUserById` function.
 * It returns the deleted user as a JSON response.
 * If an error occurs during the process, it logs the error and sends a status of 400.
 */
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

/**
 * @function updateUser
 * This function updates a user's username in the database based on the provided user ID.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object for sending back the result.
 * It extracts the user ID from the request parameters and the new username from the request body.
 * If the username is missing, it sends a status of 400.
 * It retrieves the user by ID using the `getUserById` function.
 * It updates the user's username with the new value.
 * It saves the updated user to the database.
 * It returns the updated user as a JSON response with a status of 200.
 * If an error occurs during the process, it logs the error and sends a status of 400.
 */
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.username = username;

    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
