import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults

const access = {
  host: process.env.MYSQL_AWS_HOST,
  user: process.env.MYSQL_AWS_USER,
  database: "burger_app",
  password: process.env.MYSQL_AWS_PWD,
  port: parseInt(process.env.MYSQL_AWS_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};
const pool = mysql.createPool(access);

export { pool as connection };
