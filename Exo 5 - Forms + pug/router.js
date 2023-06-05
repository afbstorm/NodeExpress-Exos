const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('form');
});

router.post('/submit-form', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    res.send(`Name: ${name}, Email: ${email}`);
});

module.exports = router;