import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { verifyClaim } from './server/geminiService';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '1mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'PAKVERIFY Fact-Check API',
      timestamp: new Date().toISOString(),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  app.post('/api/verify', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'Please provide a message or claim to verify.' });
      }

      if (message.trim().length > 10000) {
        return res.status(400).json({ error: 'Message length exceeds the 10,000 character limit.' });
      }

      const result = await verifyClaim(message.trim());
      return res.json(result);
    } catch (error: any) {
      console.error('Server error in /api/verify:', error);
      return res.status(500).json({
        error: 'Failed to verify claim. Please try again in a few moments.',
        details: error?.message || String(error),
      });
    }
  });

  // Vite middleware setup for dev vs prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PAKVERIFY server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
