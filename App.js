const express = require('express');
const bodyParser = require('body-parser');
const catRoutes = require('./routes/catRoutes');
const sequelize = require('./config/db');

const app = express();
app.use(bodyParser.json());

app.use('/cats', catRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log('Error syncing with the database: ', err));
