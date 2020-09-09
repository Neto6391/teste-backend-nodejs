export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/teste-backend',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: Number(process.env.REDIS_PORT) || 6379,
  port: process.env.PORT || 5050,
  keyGeocoding: process.env.KEY_GEOCODING || 'hLpA0KXVUTATD0vLAsL2BQOLPxJrhPmw'
}
