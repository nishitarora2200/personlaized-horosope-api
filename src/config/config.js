require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/horoscopeDB',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'

}