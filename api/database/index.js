const mysql = require('mysql2/promise');

module.exports = {
    query: async (query) => {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        const [rows, fields] = await connection.execute(query);
        return rows;
    }
}