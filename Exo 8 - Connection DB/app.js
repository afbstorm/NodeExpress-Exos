const express = require('express');
const router = require('./register.router');
const queries = require('./database');

const app = express();
const port = 8001;

app.use(express.json());
app.use(router); 

app.post('/', queries.addUser);

app.get('/', queries.getAll);

app.get('/:id', queries.getUserById);

app.patch('/:id', queries.updateUser);

app.delete('/:id', queries.deleteUser);

 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})  