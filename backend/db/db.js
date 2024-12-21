const mysql = require("mysql2");


db = mysql.createConnection({
    host: process.env.HOST||'localhost',
    user: process.env.USER||'root',
    password: process.env.PASSWORD||'1234',
    database: process.env.DATABASE||'employmanag'
})
db.connect((err) => {
    if (!err)
        console.log("DB connection succeded");
    else
        console.log("DB connection failed");
});
module.exports = db;
