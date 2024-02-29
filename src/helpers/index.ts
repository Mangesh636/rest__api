import crypto from "crypto";

const SECRET = "MANGESH-636";

/**
 * @function random
 * This function generates a random string of bytes and encodes it in base64 format.
 * It returns the generated random string.
 */
export const random = () => crypto.randomBytes(128).toString("base64");

/**
 * @function authentication
 * This function generates a hashed authentication value based on the provided salt and password.
 * @param {string} salt - The salt used for hashing.
 * @param {string} password - The password to be hashed.
 * It creates a HMAC hash using SHA256 algorithm with the salt and password.
 * It updates the hash with the SECRET value.
 * It returns the hashed value in hexadecimal format.
 */
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
