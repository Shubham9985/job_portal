import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import './config/instrument.js';
import * as Sentry from "@sentry/node";


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

//port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);


//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//connect to database
connectDB(); 

//check status update if git is working fine or not