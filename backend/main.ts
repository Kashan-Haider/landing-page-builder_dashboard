// main.ts (or app.ts)
import express from 'express';
import dotenv from 'dotenv'
import landingPageRoutes from './routes/landingPageRoutes';
import webhookRoutes from './routes/webhookRoutes';
import cors from 'cors'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use('/api/landing-pages', landingPageRoutes);
app.use('/api/webhooks', webhookRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'webhook trigerred.....' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
