import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import { exit } from "process";
dotenv.config({ path: `${__dirname}/../../../.env` });

const main = async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  const generateFile = readFileSync(`${__dirname}/generate.sql`).toString();

  const ddlArray = generateFile.split(';');

  for (const ddl of ddlArray) {
    if (ddl.trim() !== '') {
      await db.query(ddl);
    }
  }
}

main()
  .then(() => {
    console.log('Generate database successfully');
    exit(0);
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.log(error);
    }
  });
