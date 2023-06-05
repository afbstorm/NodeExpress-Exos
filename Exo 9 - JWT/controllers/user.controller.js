const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const sqlConfig  = require('../db/database');
const UserModel = require('../models/user.model');

const UserController = {

        getAll : async (req, res) => {
          try {
            await sql.connect(sqlConfig)
            const result = await UserModel.getAll();

            console.log(result)
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
            const result = await UserModel.getUserById({id});
            if (result) {
              res.sendStatus(200);
            }
          } catch (err) {
            console.error(err);
            res.sendStatus(404);
          }
        },
      
        register : async (req, res) => {
          try {
            await sql.connect(sqlConfig);
      
            const { password, email, firstname, lastname } = req.body;
      
            const hashedPassword = bcrypt.hashSync(password, 10);
      
            const result = await UserModel.register({email, hashedPassword, firstname, lastname});
      
            if (result) {
              res.send('Ajout effectué').status(200);
            }
          } catch (err) {
            console.error(err);
            res.sendStatus(404);
          }
        },

        login: async (req, res) => {

          try {
            await sql.connect(sqlConfig);
            const { email, password } = req.body;

            const userQuery = await sql.query `SELECT * FROM users WHERE email = ${email}`
            const user = userQuery.recordset[0];

            if (user.jwt) {
              return res.status(200).redirect('/list')
            }

            else if (password) {
              const isPasswordValid = bcrypt.compareSync(password, user.password);

              if (!isPasswordValid) {
                return res.status(401).send('Invalid password');
              }

              const id = user.id;
              const payload = {
                userId: id, email: user.email
              };
              const options = {
                expiresIn: '2d',
              };

              const secret = process.env.JWT_SECRET;
              const token = jwt.sign(payload, secret, options);
              const clientJwt = await UserModel.addJwt({ token, id })

              if (clientJwt) {
                res.setHeader('Authorization', `Bearer ${token}`);
                res.status(200).json({token});
              }
            }

            if (!user) {
              console.log('No such user exist');
              res.sendStatus(404);
            }
          } catch (err) {
            console.error(err);
            res.sendStatus(404);
          }
        },

        protected: async (req, res) => {
          try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const secret = process.env.JWT_SECRET;

            if (token == null) {
              return res.sendStatus(401);
            }

            jwt.verify(token, secret, (err, payload) => {
              if(err) {
                return res.sendStatus(403);
              }
              req.user = payload;
              res.send('Accès autorisé')
            })
          } catch (err) {
            console.error(err);
            res.sendStatus(404);
          }
        } 
};

module.exports = UserController;

