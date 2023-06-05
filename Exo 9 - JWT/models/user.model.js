const sql = require('mssql');

const UserModel = {
    getAll : async () => {
        try {
        const request = await sql.query `SELECT * FROM users`

        return request;
        } catch(err) {
            console.error(err);
        }
    },

    getUserById : async (data) => {
        try {
    
          const { id } = data;
          const request = await sql.query `SELECT * FROM users WHERE id = ${id}`

          return request
        } catch (err) {
          console.error(err);
        }
      },

    register : async (data) => {
        try {
        const {email, hashedPassword, firstname, lastname} = data;
        const request = await sql.query `INSERT INTO users (firstname, lastname, password, email, username) 
                                            VALUES (${firstname}, ${lastname}, ${hashedPassword}, ${email}, LOWER(CONCAT(SUBSTRING(${firstname}, 1, 3), SUBSTRING(RIGHT(${lastname}, 3), 1, 3))))`

        return request;
        } catch(err) {
            console.error(err);
        }
    },

    addJwt: async (data) => {
        try {
            const { token, id } = data;
            const request = await sql.query `UPDATE users SET jwt = ${token} WHERE id = ${id}`

            return request; 
        } catch(err) {
            console.error(err);
        }
    }
};

module.exports = UserModel;