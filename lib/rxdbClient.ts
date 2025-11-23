// lib/rxdbClient.ts
import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { patientSchema, prescriptionSchema, suggestionSchema } from './rxdbSchemas';

let dbPromise: any = null;

export async function createDatabase() {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
}

async function _create() {
  const db = await createRxDatabase({
    name: 'prescriptiondb',
    storage: getRxStorageDexie(),
    multiInstance: true
  });

  await db.addCollections({
    patients: { schema: patientSchema },
    prescriptions: { schema: prescriptionSchema },
    suggestions: { schema: suggestionSchema }
  });

  return db;
}
