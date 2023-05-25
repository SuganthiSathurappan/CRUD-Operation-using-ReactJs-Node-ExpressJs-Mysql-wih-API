const mysql = require('mysql');
const express = require('express');
var router = express.Router();
const cors = require("cors");
const bodyparser = require('body-parser');

console.log("Enter Db")
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

app.use(bodyparser.json());

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.listen(8080, () => {
    console.log('Server started on port 8080');
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS nodejs';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS CustomerDetails(id int AUTO_INCREMENT, Name VARCHAR(255), Mobile INT(10), Email VARCHAR(255), Department VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('table created...');
    });
});

/***Create Admin Table*****/
app.get('/createAdminTable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS AdminLogin(id int AUTO_INCREMENT, UserName VARCHAR(255), Password VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else {
            console.log(result);
            res.send('table created...');
            // let sqlinsert = "INSERT INTO `AdminLogin` (`id`, `UserName`, `Password`) VALUES (1, 'test', 'test')";
            // console.log(sqlinsert)
            // db.query(sqlinsert, (err, result) => {
            //     if (err) throw err;

            //     console.log(result);
            //     res.send('Post added...');
            // });
        }
    });
})

app.post('/getLoginAuth', function (request, response) {
    // Capture the input fields
    let username = request.body.Username;
    let password = request.body.Password;
    console.log("un :", username, "pwd : ", password)
    // Ensure the input fields exists and are not empty
    if (username && password) {
        var checksql = 'SELECT * FROM AdminLogin WHERE UserName = ? AND Password = ?'
        db.query(checksql, [username, password], function (error, results) {
            console.log(results)
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Redirect to home page
                console.log("login accepted")
                response.send("true")
            } else {
                console.log("Incorrect Username and/or Password!")
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        console.log('Please enter Username and Password!');

        response.send('Please enter Username and Password!');
        response.end();
    }
});

/****View Employee Details******/
/* Read whole Data  . */
app.get('/select', (req, res) => {
    let sql = 'SELECT * FROM CustomerDetails ORDER BY id asc';
    db.query(sql, (err, result) => {
        if (err) throw err;
        //console.log("View Customer Details:", result)
        console.log("View Customer Details:", JSON.parse(JSON.stringify(result)));
        res.send(result);
    });
});

/****Insert Details*****/
app.post('/insert', (req, res) => {
    console.log(req.body);
    let form = req.body;
    let sql = `INSERT INTO CustomerDetails(EmpId, Name, Mobile, Email, Department) VALUES ('${form.empid}','${form.name}', '${form.mobile}', '${form.email}', '${form.dropdown}')`;
    console.log(sql)
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post added...');
    });
});

app.post('/insertReapt', (req, res) => {
    console.log(req.body);
    var form = req.body
    var valuesform = [form]
    var duplicateSql = "SELECT * FROM CustomerDetails WHERE EmpId = ? or Mobile = ? or Email = ?";
    valuesform.forEach((row) => {
        db.query(duplicateSql, [req.body.empid, req.body.mobile, req.body.email], (err, result) => {
            console.log(result, result.length)
            if (err) throw err;
            if (result.length === 0) {
                let sql = `INSERT IGNORE INTO CustomerDetails(EmpId, Name, Mobile, Email, Department) VALUES ('${form.empid}','${form.name}', '${form.mobile}', '${form.email}', '${form.dropdown}')`;
                db.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log('Data inserted:' + result.affectedRows);
                    res.send('true');
                });
            } else {
                console.log('Data already exists: ' + result.length);
                res.send('Data already exists');
            }
        });
    });
    
});

/****Update View Details****/

/* Read Data  given id. */
app.get('/select/:eid', (req, res) => {
    var getId = req.params.eid
    console.log("ID passing : ", getId)
    let sql = 'SELECT * FROM CustomerDetails WHERE EmpId = ?';
    db.query(sql, getId, (err, result) => {
        if (err) throw err;
        console.log("View Customer Details:", JSON.parse(JSON.stringify(result)));
        res.send(JSON.parse(JSON.stringify(result)));
    });
});


/****Update Employee Details*****/

app.put('/update/:eid', (req, res) => {
    const getId = req.params.eid;
    var uname = req.body.name
    var mail = req.body.email
    var mobile = req.body.mobile
    var dept = req.body.department
    console.log("Update ID passing : ", getId + uname + mail + mobile + dept)
    db.query('UPDATE CustomerDetails SET Name = ?,Email = ?,Mobile = ?, Department = ? WHERE EmpId = ?', [uname, mail, mobile, dept, getId], (err, result) => {
        if (err) throw err;
        console.log("Successfully updated Customer Details. ", (result))
        res.send('ok');
    });

});

/****Delete Employee Details****/
app.delete('/delete/:eid', (req, res) => {
    var getId = req.params.eid
    console.log("ID passing : ", getId)
    let sql = 'DELETE FROM CustomerDetails WHERE EmpId = ?';
    db.query(sql, getId, (err, result) => {
        if (err) throw err;
        console.log("Delete:", JSON.parse(JSON.stringify(result)));
        res.send(JSON.parse(JSON.stringify(result)));
    });
});