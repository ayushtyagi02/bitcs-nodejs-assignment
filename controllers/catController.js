const { log } = require('console');
const Cat = require('../models/Cat');
const { Op } = require('sequelize');

exports.getCats = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  try {
    const cats = await Cat.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      total: cats.count,
      pages: Math.ceil(cats.count / limit),
      currentPage: page,
      data: cats.rows,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCatById = async (req, res) => {
  try {
    const cat = await Cat.findByPk(req.params.id);
    if (cat) {
      res.json(cat);
    } else {
      res.status(404).json({ message: 'Cat not found ' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchCats = async (req, res) => {
    console.log("reqq");
  const { age_lte, age_gte } = req.query;
  
  try {
    const cats = await Cat.findAll({
      where: {
        age: {
          [Op.between]: [age_gte || 0, age_lte || 100],
        },
      },
    });
    console.log(cats)
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createCat = async (req, res) => {
  const { name, age, breed } = req.body;

  if (!name || !age || !breed) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newCat = await Cat.create({ name, age, breed });
    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCat = async (req, res) => {
  const { name, age, breed } = req.body;

  try {
    const cat = await Cat.findByPk(req.params.id);

    if (cat) {
      cat.name = name || cat.name;
      cat.age = age || cat.age;
      cat.breed = breed || cat.breed;

      await cat.save();
      res.json(cat);
    } else {
      res.status(404).json({ message: 'Cat not found ' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCat = async (req, res) => {
  try {
    const cat = await Cat.findByPk(req.params.id);

    if (cat) {
      await cat.destroy();
      res.status(204).json({message:'cat deleted successfully'}).send();
    } else {
      res.status(404).json({ message: 'Cat not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
