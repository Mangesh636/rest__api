import { UserModel } from "../models/users";

/**
 * This function retrieves all users from the UserModel.
 */
export const getUsers = () => UserModel.find();

/**
 * The function `getUserByEmail` retrieves a user from the database based on their email address.
 * @param {string} email - The `email` parameter is a string that represents the email address of the
 * user you want to find in the database.
 */
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

/**
 * The function `getUserBySessionToken` retrieves a user based on a provided session token from the
 * UserModel collection.
 * @param {string} sessionToken - A session token is a unique identifier that is generated when a user
 * logs in to a system or application. It is used to authenticate and authorize the user during their
 * session.
 */
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

/**
 * The function `getUserById` retrieves a user by their ID using the `UserModel` class.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a user.
 * It is used to query the database for a user with the specified identifier.
 */
export const getUserById = (id: string) => UserModel.findById(id);

/**
 * The function `createUser` takes in values, creates a new user model with those values, saves it, and
 * returns the user object.
 * @param values - The `values` parameter in the `createUser` function is expected to be an object with
 * keys of type `string` and values of type `any`. This object is used to create a new `UserModel`
 * instance, save it to the database, and then return the saved user object as
 */
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

/**
 * The function `deleteUserById` deletes a user from the database based on their ID.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * user you want to delete from the database.
 */
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

/**
 * The function `updateUserById` updates a user by their ID with the provided values using Mongoose's
 * `findByIdAndUpdate` method.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * user whose information you want to update in the database.
 * @param values - The `values` parameter in the `updateUserById` function is a record object that
 * contains key-value pairs representing the fields and values that you want to update for a user in
 * the database. The keys in the `values` object correspond to the fields in the user document that you
 * want to update
 */
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
