const express = require('express');
const fileUpload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(fileUpload());

// Swagger
const swaggerDocument = yaml.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/documents', require('./routes/documents'));
app.use('/ingestion', require('./routes/ingestion'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//http://localhost:3000/api-docs