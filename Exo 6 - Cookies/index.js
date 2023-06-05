const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router');

const port = 8001
const app = express();

// On signale a express qu'il va utiliser les modules de cookie-parser
app.use(cookieParser());
app.use(router);

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
  });