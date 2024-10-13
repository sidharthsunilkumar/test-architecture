import express from 'express';
import Redis from 'redis';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

const client = Redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
client.on('error', (err) => console.log('Redis Client Error', err));
// Connect to Redis when the app starts
(async () => {
  await client.connect();
})();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}).promise();

app.get('/api1', (req, res) => {
  res.send('From app A');
});

app.get('/api2', (req, res) => {
  res.send('From A via B');
});

app.post('/store', async (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).send('Both key and value are required');
  }
  try {
    await client.set(key, value);
    res.status(200).send('Data stored successfully');
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).send('Error storing data');
  }
});

app.get('/retrieve/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const value = await client.get(key);
    if (value === null) {
      res.status(404).send('Key not found');
    } else {
      res.status(200).json({ key, value });
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Error retrieving data');
  }
});

app.get('/db', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT COUNT(*) AS count FROM account_details');
    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Error executing MySQL query');
  }
});

app.listen(port, () => {
  console.log(`App A listening at http://localhost:${port}`);
});

// Graceful shutdown of redis connection
process.on('SIGINT', async () => {
  await client.quit();
  await pool.end();         // for DB
  process.exit(0);
});