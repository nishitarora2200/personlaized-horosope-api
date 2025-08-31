require('dotenv').config();
const app = require('./app');
const connectDB = require('./src/config/db');
const config = require('./src/config/config');
const PORT = config.port || 3000;

connectDB(); // connect to MongoDB

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
