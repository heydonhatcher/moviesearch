const { Pool } = require("pg");

require("dotenv").config();

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating connection...");
      this.pool = new Pool({
        max: 100,
        host: "34.69.101.132",
        user: "postgres",
        password: process.env.PG_PASSWORD,
        database: "postgres"
      });
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;
