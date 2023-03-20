import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
import { exit } from "process";
dotenv.config({path: `${__dirname}/../../../.env`});

const main = async () => {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  const [rows] = await db.query('SELECT * FROM User');
  console.log(rows);
}

main().then(() => {
  console.log('Generate database successfully');
  exit(1);
});
