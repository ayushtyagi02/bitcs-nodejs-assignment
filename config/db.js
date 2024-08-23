const { Sequelize } = require("sequelize");
const Cat = require("../models/Cat");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('MySQL Database connected...');
    return sequelize.sync();  // Sync the models with the database
  })
  .then(async () => {
    console.log('Database synced and ready.');
    
    // Use raw SQL to check if there are any entries in the Cat table
    const [results, metadata] = await sequelize.query('SELECT COUNT(*) AS count FROM Cats');
    const catCount = results[0].count;

    if (catCount === 0) {
      // If no cats exist, add default ones
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
  })
  .catch((err) => console.log('Error: ' + err));

module.exports = sequelize;
