const express = require("express");
const app = express();
const db = require("./db");
app.use(express.json());
app.listen(3000, () =>{
    console.log('node server start');
});
app.get("/",(req, res) => {
    res.send("node server Ready");
});
app.get("/a",(req, res) => {
    res.send("node server a Ready");
});

app.post("/login", (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error",
        });
    }
    if (result.length > 0) {
            res.json({
                status: true,
                message: "Login Success",
        });
    } else {
            res.json({
                status: false,
                message: "Username หรือ Password ไม่ถูกต้อง",
            });
        }
    });
});