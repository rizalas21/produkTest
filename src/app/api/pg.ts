import { Pool } from "pg";

const db = new Pool({
  user: "Rizal",
  host: "localhost",
  database: "fastprinttesdb",
  password: "12345",
  port: 5432,
});

export default db;
