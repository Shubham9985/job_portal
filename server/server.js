import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import './config/instrument.js';
import * as Sentry from "@sentry/node";
import { clerkWebHooks } from './controllers/WebHooks.js';



//initialize express app
const app = express();

//middlewares
app.use(cors());
app.use(express.json()); //to parse json data

//sample route
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebHooks);


//port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);


//connect to database
connectDB();

// Start server for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

//export for Vercel serverless
export default app;