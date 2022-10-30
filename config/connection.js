// Requiring mongoose and detructuring functions
const { connect, connection } = require('mongoose');

// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
const connectionString =
// the string part is the MongoDB database name after the '/'
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

//   Let database have these properties
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
