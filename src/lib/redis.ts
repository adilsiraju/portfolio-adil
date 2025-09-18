// Redis disabled: export a no-op client to fully remove DB connectivity.
// This avoids importing any Redis library and ensures all calls are safe.

type AsyncFn<T = unknown> = (...args: unknown[]) => Promise<T>

interface NoOpRedisClient {
  hSet: AsyncFn<string>
  hGetAll: AsyncFn<Record<string, string>>
  lPush: AsyncFn<number>
  lRange: AsyncFn<string[]>
  get: AsyncFn<string | null>
  incr: AsyncFn<number>
}

// no-op implementation removed; return values are inlined below to avoid unused vars

export const redisClient: NoOpRedisClient = {
  hSet: async () => 'OK',
  hGetAll: async () => ({}),
  lPush: async () => 1,
  lRange: async () => [],
  get: async () => null,
  incr: async () => 1,
}
