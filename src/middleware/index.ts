import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../actions/action";

/**
 * @function isAuthenticated
 * This middleware function checks if a user is authenticated based on the session token.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next function in the middleware chain.
 * It retrieves the session token from the request cookies.
 * If the session token is missing, it sends a status of 400.
 * It retrieves the user based on the session token using `getUserBySessionToken`.
 * If the user does not exist, it sends a status of 403.
 * It merges the user information into the request object under the key 'identity'.
 * It then proceeds to the next middleware function.
 * If an error occurs during the process, it logs the error and sends a status of 400.
 */
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["AUTH-COOKIE"];

    if (!sessionToken) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * @function isOwner
 * This middleware function checks if the current user is the owner of a resource.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next function in the middleware chain.
 * It extracts the `id` from the request parameters.
 * It retrieves the current user's ID from the request object.
 * If the current user ID is missing, it sends a status of 403.
 * It compares the current user's ID with the provided `id`.
 * If they do not match, it sends a status of 403.
 * Otherwise, it proceeds to the next middleware function.
 * If an error occurs during the process, it logs the error and sends a status of 400.
 */
export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;

    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
