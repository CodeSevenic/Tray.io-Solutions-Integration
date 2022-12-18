/** @module domain/registration */

const uuidv1 = require('uuid/v1');

const { isNil } = require('lodash');
const { mutations } = require('../graphql');
const { insertUserToMockDB, retrieveUserFromMockDB, userExistsInMockDB } = require('../db');
const { addUserToBD, getUserFromDB } = require('../firebase-db');

/**
 * Validate user object:
 * @param {User} user - The user input given
 * @return {Array<Error>} List of missing input fields
 */
const validateNewUser = (user) => {
  const errors = [];
  const fields = ['username', 'password', 'name'];

  fields.forEach((f) => {
    if (isNil(user[f]) || user[f] === '') {
      errors.push(f);
    }
  });

  return errors;
};

/**
 * Check if a given user already exists:
 * @param {Request} req
 * @return {Boolean}
 */
exports.checkUserExists = (req) => userExistsInMockDB(req.body);

/**
 * Validate user object from a request:
 * @param {Request} req
 * @return {Validation} Has a valid field and a list of errors if not valud
 */
exports.validateRequest = (req) => {
  const validationErrors = validateNewUser(req.body);

  if (validationErrors.length) {
    return {
      valid: false,
      errors: validationErrors,
    };
  }

  return { valid: true };
};

/**
 * Generate a new user:
 * @param {Request} req
 * @return {User} The new user that was created
 */
exports.generateNewUser = (req) => {
  // Generate UUID for user:
  const uuid = uuidv1();

  // Generate a tray user for this account:
  return mutations.createExternalUser(uuid, req.body.name).then((createRes) => {
    // Add user to internal DB:
    insertUserToMockDB({
      uuid: uuid,
      body: req.body,
      trayId: createRes.data.createExternalUser.userId,
    });

    addUserToBD({ uuid: uuid, body: req.body, trayId: createRes.data.createExternalUser.userId });
    getUserFromDB();

    return retrieveUserFromMockDB(req.body);
  });
};
