require('dotenv').config({ path: require('find-config')('.env') });

const databaseConfig = {
  username: process.env.NAME || '',
  password: process.env.PASSWORD || ''
};

module.exports = databaseConfig;
