const express = require('express');
const { connectDB } = require('./src/db/db');


const app = express();
const PORT = process.env.PORT || 3000;





connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
});