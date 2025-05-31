import { createClient } from 'redis'

const redisUrl = process.env.REDIS_URL

if (!redisUrl || redisUrl === 'your_redis_url_here') {
  console.warn('REDIS_URL environment variable is not set or using placeholder value')
}

let redis: ReturnType<typeof createClient> | null = null

// Only create Redis client if we have a valid URL
if (redisUrl && redisUrl !== 'your_redis_url_here') {
  try {
    redis = createClient({
      url: redisUrl,
    })

    redis.on('error', (err) => {
      console.error('Redis Client Error', err)
    })

    // Connect to Redis
    if (!redis.isOpen) {
      redis.connect().catch(console.error)
    }
  } catch (error) {
    console.error('Failed to create Redis client:', error)
    redis = null
  }
}

// Create a mock Redis client for development/build
const mockRedis = {
  hSet: async () => 'OK',
  hGetAll: async () => ({}),
  lPush: async () => 1,
  lRange: async () => [],
  get: async () => null,
  incr: async () => 1,
  isOpen: false,
  connect: async () => undefined,
}

export const redisClient = redis || mockRedis
