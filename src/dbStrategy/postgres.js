import dotenv from "dotenv";
import pg from 'pg';

dotenv.config()
const { Pool } = pg;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const database = process.env.DATABASE_URL
const databaseConfig = {
      connectionString: database,
      ssl:{
            rejectUnautorized: false
      },
   }

const connection = new Pool(databaseConfig);

export default connection;