require('dotenv').config()
const bcrypt = require('bcrypt');
const sql = require('mssql');

const { DB_USER, DB_PSW, DB_NAME } = process.env;

const sqlConfig = {
  user: DB_USER,
  password: DB_PSW,
  database: DB_NAME,
  server: 'localhost',
  pool: { // Paramètrage de connection simultanée sur une base de données - Permet de meilleure performance par le biais de ces connections réutilisables (en veille si inutilisées)
    max: 10,
    min: 0,
    idleTimeoutMillis: 300000 // 300 000 millisecondes = 5min 
  },
  options: {
    trustServerCertificate: true // mettre true pour le dev-local
  }
}

const queries = {

  getAll : async (req, res) => {
    try {
      await sql.connect(sqlConfig)
      const result = await sql.query `SELECT * FROM users`
      if (result) {
        res.sendStatus(200);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
    }
  },

  getUserById : async (req, res) => {
    try {

      const { id } = req.params;
      await sql.connect(sqlConfig)
      const result = await sql.query `SELECT * FROM users WHERE id = ${id}`
      if (result) {
        res.sendStatus(200);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
    }
  },

  addUser : async (req, res) => {
    try {
      await sql.connect(sqlConfig);

      const { password, email, firstname, lastname } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 10);

      const result = await sql.query `INSERT INTO users (firstname, lastname, password, email, username) 
                                      VALUES (${firstname}, ${lastname}, ${hashedPassword}, ${email}, LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))))`

      if (result) {
        res.send('Ajout effectué').status(200);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
    }
  },

  updateUser : async (req, res) => {
    try {
      await sql.connect(sqlConfig);

      const { id } = req.params;
      const { firstname, lastname, email, newPassword, oldPassword } = req.body;

      const userQuery = await sql.query `SELECT * FROM users WHERE id = ${id}`
      const user = userQuery.recordset[0];

      let hashedPassword;
      if (newPassword && oldPassword) {

        const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);

        if (!isPasswordValid) {
          return res.status(401).send('Invalid password');
        }
        
        else {
          hashedPassword = bcrypt.hashSync(newPassword, 10);
        }
      }

      if (!user) {
        console.log('No such user exist');
        res.sendStatus(404);
      }

      let update;
      if (firstname && lastname && email && hashedPassword) {
      update = sql.query `UPDATE users SET firstname = ${firstname}, lastname = ${lastname}, email = ${email}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))), password = ${hashedPassword} WHERE id = ${id}`
    } else if (firstname && lastname && email) {
      update = sql.query `UPDATE users SET firstname = ${firstname}, lastname = ${lastname}, email = ${email}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))) WHERE id = ${id}`
    } else if (firstname && lastname && hashedPassword) {
      update = sql.query `UPDATE users SET firstname = ${firstname}, lastname = ${lastname}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))), password = ${hashedPassword} WHERE id = ${id}`
    } else if (firstname && lastname) {
      update = sql.query `UPDATE users SET firstname = ${firstname}, lastname = ${lastname}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))) WHERE id = ${id}`
    } else if (firstname && email && hashedPassword) {
      update = sql.query `UPDATE users SET firstname = ${firstname}, email = ${email}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))), password = ${hashedPassword} WHERE id = ${id}`
    } else if (firstname && email) {
      update = sql.query `UPDATE users SET firstname = ${firstname}, email = ${email}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))) WHERE id = ${id}`
    } else if (lastname && email && hashedPassword) {
      update = sql.query `UPDATE users SET lastname = ${lastname}, email = ${email}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))), password = ${hashedPassword} WHERE id = ${id}`
    } else if (lastname && email) {
      update = sql.query `UPDATE users SET lastname = ${lastname}, email = ${email}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))) WHERE id = ${id}`
    } else if (firstname && hashedPassword) {
      update = sql.query `UPDATE users SET firstname = ${firstname}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))), password = ${hashedPassword} WHERE id = ${id}`
    } else if (firstname) {
      update = sql.query `UPDATE users SET firstname = ${firstname}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))) WHERE id = ${id}`
    } else if (lastname && hashedPassword) {
      update = sql.query `UPDATE users SET lastname = ${lastname}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))), password = ${hashedPassword} WHERE id = ${id}`
    } else if (lastname) {
      update = sql.query `UPDATE users SET lastname = ${lastname}, username = LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))) WHERE id = ${id}`
    } else if (email && hashedPassword) {
      update = sql.query `UPDATE users SET email = ${email}, password = ${hashedPassword} WHERE id = ${id}`
    } else if (email) {
      update = sql.query `UPDATE users SET email = ${email} WHERE id = ${id}`
    } else if (hashedPassword) {
      update = sql.query `UPDATE users SET password = ${hashedPassword} WHERE id = ${id}`
    }
    
    if (update) {
      const result = await update;
      if (result) {
        res.send('Modification effectuée').status(200);
      }
    }
    
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
    }
  },

  deleteUser : async (req, res) => {
    try {
      await sql.connect(sqlConfig);
      const { id } = req.params;

      const result = await sql.query `DELETE FROM users WHERE id = ${id}`
      console.log(result);
      if (result) {
        res.send('Suppression effectuée').status(204);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
    }
  }
} 

module.exports = queries;