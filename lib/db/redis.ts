import Redis, { RedisOptions } from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import config from '../config';

const { REDIS_URL } = config;

const redisOptions: RedisOptions = {
	retryStrategy: times => Math.min(times * 50, 2000),
};

const redis = new Redis(REDIS_URL, redisOptions);

const pubsub = new RedisPubSub({
	publisher: new Redis(REDIS_URL, redisOptions),
	subscriber: new Redis(REDIS_URL, redisOptions),
});

export { redis, pubsub };
