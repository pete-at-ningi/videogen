const express = require('express');
const next = require('next');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Synthesia API routes
  app.post('/api/videos', async (req, res) => {
    try {
      const { title, script, avatar, background } = req.body;

      if (!process.env.SYNTHESIA_API_KEY) {
        return res
          .status(500)
          .json({ error: 'Synthesia API key not configured' });
      }

      const requestBody = {
        title: title || 'Generated Video',
        test: true, // Remove this line for production to avoid using credits
        input: [
          {
            scriptText: script,
            avatar: avatar || 'anna_costume1_cameraA',
            background: background || 'green_screen',
          },
        ],
      };

      console.log(
        'Sending request to Synthesia API:',
        JSON.stringify(requestBody, null, 2)
      );

      const response = await fetch('https://api.synthesia.io/v2/videos', {
        method: 'POST',
        headers: {
          Authorization: `${process.env.SYNTHESIA_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Synthesia API Error:', errorData);
        return res.status(response.status).json({
          error: 'Failed to create video',
          details: errorData,
        });
      }

      const data = await response.json();
      res.status(201).json(data);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get all videos
  app.get('/api/videos', async (req, res) => {
    try {
      if (!process.env.SYNTHESIA_API_KEY) {
        return res
          .status(500)
          .json({ error: 'Synthesia API key not configured' });
      }

      const response = await fetch('https://api.synthesia.io/v2/videos', {
        method: 'GET',
        headers: {
          Authorization: `${process.env.SYNTHESIA_API_KEY}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Synthesia API Error:', errorData);
        return res.status(response.status).json({
          error: 'Failed to fetch videos',
          details: errorData,
        });
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get specific video status
  app.get('/api/videos/:id', async (req, res) => {
    try {
      const { id } = req.params;

      if (!process.env.SYNTHESIA_API_KEY) {
        return res
          .status(500)
          .json({ error: 'Synthesia API key not configured' });
      }

      const response = await fetch(`https://api.synthesia.io/v2/videos/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `${process.env.SYNTHESIA_API_KEY}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Synthesia API Error:', errorData);
        return res.status(response.status).json({
          error: 'Failed to fetch video',
          details: errorData,
        });
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Handle all other routes with Next.js
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
