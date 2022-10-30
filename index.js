const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Similar to sequizile.sync, this lets you open anc connect to MongoDB and the run the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT} !`);
  });
});
