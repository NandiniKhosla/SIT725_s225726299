/**
 * server.js
 * This file starts the Express server.
 * The server listens on a specific port for incoming requests.
 */

const app = require('./app');

const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
