
const express = require("express");
const {open} = require("sqlite");
const path = require("path");
const app = express();
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "database.db");
let db = null;

const initializeDbAndServer = async () => {
    try{
        db = await open({
            filename:dbPath,
            driver : sqlite3.Database
        });
        app.listen(3000, () => console.log("app is listening at 3000"))
    }catch(e) {
        console.log(`DB Error:${e.message}`)
        process.exit(1);
    }
}

app.get("/" ,async(request, response) => {
    const getData = `SELECT * FROM users`;
    const result = await db.get(getData);
    response.send(result)
})

initializeDbAndServer()