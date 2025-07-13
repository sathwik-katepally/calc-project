import express from 'express';
import cors from 'cors';
import {pool} from './db';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import {authenticate} from './authMiddleware';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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

app.post('/api/calculations', authenticate, async (req, res) => {
  const {operation, input1, input2, result} = req.body;
  // @ts-ignore
  const email = req.user?.email;

  try {
    await pool.query(
      'INSERT INTO calculations (operation, input1, input2, result, email) VALUES ($1, $2, $3, $4, $5)',
      [operation, input1, input2, result, email],
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

app.get('/auth/google', (req, res) => {
  const redirect_uri = 'http://localhost:3001/auth/google/callback';
  const scope = ['profile', 'email'];
  const auth_url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope.join(' ')}`;
  res.redirect(auth_url);
});

app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code as string;
  try {
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      null,
      {
        params: {
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: 'http://localhost:3001/auth/google/callback',
          grant_type: 'authorization_code',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const access_token = tokenResponse.data.access_token;
    const profileResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const user = profileResponse.data;
    const jwtPayload = {
      email: user.email,
      name: user.name,
      picture: user.picture,
    };
    const token = jwt.sign(jwtPayload, JWT_SECRET, {expiresIn: '1h'});
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });
    res.redirect('http://localhost:5173');
    console.log('Logged in Google  user:', user);
  } catch (error) {
    res.status(500).json({message: 'Auth failed'});
  }
});
