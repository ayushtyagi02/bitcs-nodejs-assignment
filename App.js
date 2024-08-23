const express = require('express');
const bodyParser = require('body-parser');
const catRoutes = require('./routes/catRoutes');
const sequelize = require('./config/db');  // Make sure this path is correct
const Cat = require('./models/Cat');        // Make sure this path is correct

const app = express();
app.use(bodyParser.json());
app.use('/cats', catRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.sync();  // Synchronize models with the database
    
    // Check if any cats are already in the database
    const catCount = await Cat.count();

    if (catCount === 0) {
      // Insert default cats if the table is empty
      await Cat.bulkCreate([
        { name: 'Whiskers', age: 3, breed: 'Siamese' },
        { name: 'Fluffy', age: 5, breed: 'Persian' },
        { name: 'Mittens', age: 2, breed: 'Maine Coon' },
        { name: 'Tiger', age: 4, breed: 'Bengal' },
        { name: 'Shadow', age: 1, breed: 'Russian Blue' },
        { name: 'Oscar', age: 7, breed: 'British Shorthair' },
        { name: 'Smokey', age: 6, breed: 'Sphynx' },
        { name: 'Ginger', age: 3, breed: 'Abyssinian' },
        { name: 'Simba', age: 4, breed: 'Savannah' },
        { name: 'Luna', age: 2, breed: 'Ragdoll' },
        { name: 'Leo', age: 5, breed: 'Scottish Fold' },
        { name: 'Bella', age: 1, breed: 'Siberian' },
        { name: 'Oliver', age: 3, breed: 'Turkish Van' },
        { name: 'Milo', age: 6, breed: 'Birman' },
        { name: 'Charlie', age: 2, breed: 'Exotic Shorthair'}
      ]);
      console.log('Default cats added to the database.');
    } else {
      console.log('Cats already exist, no need to add.');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log('Error syncing with the database: ', err);
  }
}

startServer();
