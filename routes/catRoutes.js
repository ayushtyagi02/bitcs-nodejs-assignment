const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const authMiddleware = require('../middlewares/authMiddleware');
router.get('/getCats', catController.getCats); //done
router.get('/getCat/:id', catController.getCatById); //done
router.get('/search', catController.searchCats);// done
router.post('/', authMiddleware, catController.createCat); //done
router.put('/updateCat/:id', authMiddleware, catController.updateCat); // done
router.delete('/deleteCat/:id', authMiddleware, catController.deleteCat);

module.exports = router;
