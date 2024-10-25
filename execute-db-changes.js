const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function executeSqlFile(filePath) {
  const connection = await mysql.createPool({
    host: "app.rms.com.co",
    user: "rmsapp",
    password: "rms123**",
    port: 3306,
    database: "productscrud",
  });

  const sql = fs.readFileSync(filePath, "utf8");
  const queries = sql.split(";").filter((query) => query.trim());

  try {
    for (const query of queries) {
      await connection.query(query);
    }
    console.log("SQL file executed successfully.");
  } catch (err) {
    console.error("Error executing SQL file:", err);
  } finally {
    await connection.end();
  }
}

const sqlFilePath = path.join(__dirname, "database", "db.sql");
executeSqlFile(sqlFilePath);
