import { Mongoose } from "mongoose";

interface MongooseCached {
  promise?: Promise<Mongoose> | null;
  conn?: Mongoose | null;
}

declare global {
  namespace NodeJS {
    interface Global {
      mongoose?: MongooseCached;
    }

    interface ProcessEnv {
      MONGO_URL?: string;
    }
  }
}
