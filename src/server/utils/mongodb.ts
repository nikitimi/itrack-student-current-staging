'server only';

import { MongoClient } from 'mongodb';
import { z } from 'zod';

const connectionString = process.env.MONGO_CONNECTION_STRING as string;

export const collectionPath = z.enum(['Grades', 'Certificates', 'Internship']);
type CollectionPath = z.infer<typeof collectionPath>;

export const mongoclient = new MongoClient(connectionString, {
  monitorCommands: true,
});

const studentDB = mongoclient.db('student');

export function collection(path: CollectionPath) {
  return studentDB.collection(path);
}
