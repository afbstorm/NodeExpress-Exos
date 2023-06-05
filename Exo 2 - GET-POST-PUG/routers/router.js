const HomeController = require('../controllers/home.controller');

const router = require('express').Router();

router.get('/', HomeController.index);
router.get('/contact', HomeController.contact_GET);
router.post('/contact', HomeController.contact_POST);

// TODO Product (list, detail, ...)

module.exports = router;