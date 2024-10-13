import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.get('/api1', (req, res) => {
  res.send('From app B');
});

app.get('/api2', async (req, res) => {
  try {
    const response = await axios.get(process.env.APP_A_URL + 'api2');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error calling App A');
  }
});

app.listen(port, () => {
  console.log(`App B listening at http://localhost:${port}`);
});