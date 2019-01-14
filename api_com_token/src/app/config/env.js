const env = {
    database: 'node_sequelize',
    username: 'desafio',
    password: 'd3s@f1o',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    SMTP_SERVER: 'smtp.umbler.com',
    SMTP_PORT: 587,
    SMTP_USERNAME: 'kidemias@kidemais.ml',
    SMTP_PASSWORD: 'Kide+321'
  };
   
  module.exports = env;