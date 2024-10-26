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
});

const redis = new Redis(process.env.REDIS_URL);

const elasticsearch = new ElasticsearchClient({
  node: process.env.ELASTICSEARCH_URL,
});

const influxDB = new InfluxDB({
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN,
});

export { pool, redis, elasticsearch, influxDB };
