// const { NODE_ENV } = process.env;
// const { NODE_ENV } = null;
const config = `./config/config.${'development'}.js`;
module.exports = require(config);
