const express = require('express');
const connectDB = require('./config/db');
const validateEnvironment = require('./config/env');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(cors({ origin: clientOrigin, credentials: true }));

const errorHandler = require('./middlewares/errorMiddleware');
const userRouter = require('./routers/userRouter');

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the AuthApp API' });
});
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

async function startServer() {
  try {
    validateEnvironment();
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

startServer();
