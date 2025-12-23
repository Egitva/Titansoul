//const mysql = require('mysql');
//const { config } = require('node:process');
const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "titansoul_cardgame",
    password: ""
})
conn.connect(err =>{
    if (err) {
        console.log("net idi nahui");
        return err;
    }
    else {
        console.log("ok");
    }
})