require('dotenv').config()

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

module.exports = sqlConfig;
