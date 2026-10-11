const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// import routes
const errorHandler = require('./middlewares/errorMiddleware');
const userRouter = require('./routers/userRouter');

// Routes
app.use('/api/users', userRouter);

// Error handling middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the AuthApp API' });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
