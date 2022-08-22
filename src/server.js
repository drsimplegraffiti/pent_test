const app = require('./app');
const connectDB = require('./db/db');

const port = process.env.PORT || 4545;


app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
