/** @module domain/login */

const { get } = require('lodash');
const { mutations } = require('../graphql');
const { retrieveUserFromMockDB } = require('../db');

/**
 * Attempt to retrieve a user from the DB:
 * @param {Request}
 * @return {User | undefined}
 */
exports.attemptLogin = (req) => {
  const user = retrieveUserFromMockDB(req.body);

  if (user) {
    req.session.user = user;
    req.session.admin = true;
  }

  return user;
};

/**
 * Attempt to generate access token for a given user:
 * @param {Request}
 * @param {Response}
 * @param {User}
 * @return {Promise<GQLMutation>} Promise that wraps authorization mutation.
 */
exports.generateUserAccessToken = (req, res, user) =>
  mutations.authorize(user.trayId).then((authorizeResponse) => {
    req.session.token = get(authorizeResponse, 'data.authorize.accessToken');

    return authorizeResponse;
  });
