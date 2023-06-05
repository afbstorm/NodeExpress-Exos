const express = require('express');
const router = require('./routers/user.router');

const app = express();
const port = 8001;

app.use(express.json());
app.use(router);

 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})  