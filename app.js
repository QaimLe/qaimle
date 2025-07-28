require('dotenv').config(); // FIRST
const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimiter = require('./shared/config/rateLimiter');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const evaluationRoutes = require('./modules/evaluation/presentation/routes');

const app = express();
// const db = require('./config/db');

// // Connect to DB
// db();

// Rate limiter
app.use(rateLimiter);
app.set('trust proxy', 1); // ✅ Best for Railway

// Logging
app.use(morgan('dev'));

// Parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/health-check", (req, res) => res.send("OK"));

app.use('/api/evaluation', evaluationRoutes);


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description: 'API documentation for the Express backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI (dev only)
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}



// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const indexRoutes = require('./shared/routes/index');
app.use('/', indexRoutes);




// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found'
  });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;
