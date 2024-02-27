const mysql = require("mysql")
const db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "QuanG&C13082004",
    database: "ptp_db"
})

module.exports = db