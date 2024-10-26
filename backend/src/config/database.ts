import { Pool } from 'pg';
import Redis from 'ioredis';
import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import { InfluxDB } from '@influxdata/influxdb-client';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0', 10),
  retryStrategy: (times) => Math.min(times * 50, 2000), // Reconnect strategy
});

const elasticsearch = new ElasticsearchClient({
  node: process.env.ELASTICSEARCH_URL,
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});

const influxDB = new InfluxDB({
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN,
  timeout: 10000, // 10 seconds timeout for requests
  transportOptions: {
    maxRetries: 3, // Retry failed requests up to 3 times
  },
});

export { pool, redis, elasticsearch, influxDB };
