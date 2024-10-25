import mysql from "mysql2/promise";

export const conn = mysql.createPool({
  host: "app.rms.com.co",
  user: "rmsapp",
  password: "rms123**",
  port: 3306,
  database: "productscrud",
});
