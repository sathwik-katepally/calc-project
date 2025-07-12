import express from 'express';
import cors from 'cors';
import {pool} from './db';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({status: 'healthy'});
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/api/calculations', async (req, res) => {
  const {operation, input1, input2, result} = req.body;
  try {
    await pool.query(
      'INSERT INTO calculations (operation, input1, input2, result) VALUES ($1, $2, $3, $4)',
      [operation, input1, input2, result],
    );
    res.status(200).json({message: 'Calculation saved successfully'});
  } catch (error) {
    res.status(500).json({message: 'Error saving calculation'});
  }
});

app.get('/api/calculations', async (req, res) => {
  console.log('GET /api/calculations called');
  try {
    const result = await pool.query('SELECT * FROM calculations');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({message: 'Error fetching calculations'});
    console.error('Error fetching calculations:', error);
  }
});
