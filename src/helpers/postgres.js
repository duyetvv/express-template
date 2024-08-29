const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: '123456',
  port: 5432,
});

export default client.connect();