const connection = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
};

module.exports = {
  connection,
};