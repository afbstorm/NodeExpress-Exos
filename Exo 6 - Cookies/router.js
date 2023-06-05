const router = require('express').Router();

router.get('/set-cookie', (req, res) => {
    res.cookie('monCookie', 'Hello World', {
        maxAge: 9000000, 
        httpOnly: true
    }).send('Cookie set !');
});

router.get('/read-cookie', (req, res) => {
    console.log(req.cookies);
    const monCookie = req.cookies.monCookie;
    if (monCookie) {
        res.send(`Le cookie contient : ${monCookie} `)
    } else {
        res.send('Pas de cookie trouvé')
    }
});

module.exports = router;