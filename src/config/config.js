const POSTGRESQL_DB = process.env.POSTGRESQL_DB || "dbinventory";
const POSTGRESQL_HOST = process.env.POSTGRESQL_HOST || "localhost";
const POSTGRESQL_USER = process.env.POSTGRESQL_USER || "postgres";
const POSTGRESQL_PASSWORD = process.env.POSTGRESQL_PASSWORD || "postgres";
const POSTGRESQL_URL = process.env.POSTGRESQL_URL || "POSTGRESQL://" + POSTGRESQL_HOST + "/" + POSTGRESQL_DB;

module.exports = {
  POSTGRESQL_URL,
  POSTGRESQL_HOST,
  POSTGRESQL_DB,
  POSTGRESQL_USER,
  POSTGRESQL_PASSWORD,
};
