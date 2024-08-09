require("dotenv").config();
/**
 * Configuration to establish a database connection
 */
const config = {
    db:{
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password:'root',
        database: 'auth_system',
        connectionLimit: 10,
    }
}
module.exports = config;

