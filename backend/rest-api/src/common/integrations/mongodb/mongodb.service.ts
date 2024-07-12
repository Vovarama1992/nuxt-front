import { MongoClient } from 'mongodb';

export const DB_CONNECTION = 'DB_CONNECTION';

export const databaseProvider = {
  provide: DB_CONNECTION,
  useFactory: async () => {
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    return client;
  },
};
