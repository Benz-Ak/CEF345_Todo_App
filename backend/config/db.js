const mysql = require('mysql2');

// Création de la connexion ou du pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root_password',
    database: process.env.DB_NAME || 'todo_list',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportation pour utilisation dans les controllers
module.exports = pool.promise();