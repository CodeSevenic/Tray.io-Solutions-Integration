const { getUserFromDB } = require('./firebase-db');

// In-memory users instead of a DB:
// const mockUserDB = [];

// Use Real DB store instead of mockDB
const mockUserDB = async () => await getUserFromDB();

/**
 * Retreive user from the Mock DB:
 * @param {User} input - {username: 'myname', password: 'mypass'}
 * @returns {User | undefined}
 */
exports.retrieveUserFromMockDB = async (input) => {
  const matches = await mockUserDB.filter(
    (user) => user.username === input.username && user.password === input.password
  );

  return matches[0];
};

/**
 * Check user exists in Mock DB:
 * @param {User} input
 * @returns {Boolean}
 */
exports.userExistsInMockDB = (input) => {
  const matches = mockUserDB.filter((user) => user.username === input.username);
  return matches.length > 0;
};

/**
 * Insert user into the Mock DB:
 * @param {User} input
 *
 * @returns {Void}
 */
exports.insertUserToMockDB = (input) => {
  mockUserDB.push({
    name: input.body.name,
    uuid: input.uuid,
    trayId: input.trayId,
    username: input.body.username,
    password: input.body.password,
  });
};
