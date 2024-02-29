import { createUser, getUserByEmail } from "../actions/action";
import express from "express";
import { authentication, random } from "../helpers";

/**
 * @function register
 * This function handles the registration of a new user.
 * @param {express.Request} req - The request object containing user information.
 * @param {express.Response} res - The response object for sending back the result.
 * It expects the request body to contain `email`, `password`, and `username`.
 * If any of these fields are missing, it sends a status of 400.
 * It checks if a user with the provided email already exists.
 * If the user exists, it sends a status of 400.
 * It generates a salt for password hashing.
 * It creates a new user with the provided email, username, salt, and hashed password.
 * It returns the newly created user as a JSON response with a status of 200.
 * If an error occurs during the process, it logs the error and sends a status of 400.
 */
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * @function login
 * This function handles the login process for a user.
 * @param {express.Request} req - The request object containing user information.
 * @param {express.Response} res - The response object for sending back the result.
 * It expects the request body to contain `email` and `password`.
 * If either of these fields is missing, it sends a status of 400.
 * It retrieves the user based on the provided email and selects the `salt` and `password` fields.
 * If the user does not exist, it sends a status of 400.
 * It calculates the expected hash based on the user's salt and provided password.
 * If the password does not match the expected hash, it sends a status of 403.
 * It generates a session token for the user and updates the user's session information.
 * It sets a cookie with the session token for authentication.
 * It returns the user as a JSON response with a status of 200.
 * If an error occurs during the process, it logs the error and sends a status of 400.
 */
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("AUTH-COOKIE", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
