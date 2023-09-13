const express=require("express");
const app=express();
const port=3005;
const mysql=require("./connection").con

// confiduration
app.set("view engine","hbs");
app.set("views","./view")
app.use(express.static(__dirname+"/public"))

//Routing
app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/add",(req,res)=>{
    res.render("add");
});

app.get("/search",(req,res)=>{
    res.render("search");
});

app.get("/update",(req,res)=>{
    res.render("update");
});
app.get("/delete",(req,res)=>{
    res.render("delete");
});

app.get("/view",(req,res)=>{
    let qry="select * from test";
    mysql.query(qry,(err,results)=>{
        if(err)throw err
        else{
            res.render("view",{data:results});
        }
    });
    // res.render("view");
});

app.get("/addstudent",(req,res)=>{
// res.send("adding data!!");
// fetching data 1st way
// res.send(req.query);

// 2nd way
const { name, phone, email, gender } = req.query

    // Sanitization XSS...
    // sanitaisation xss saves from hacking
    let qry = "select * from test where emailid=? or phoneno=?";
    mysql.query(qry, [email, phone], (err, results) => {
        if (err)
            throw err
        else {

// res.send(results);

            if (results.length > 0){
                res.render("add",{checkmsg:true})
            }
            else{
                let qry2="insert into test values(?,?,?,?)";
                mysql.query(qry2, [name, phone, email, gender], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true })
                    }
                })
            }
            }
    })
});


// for searching student

app.get("/searchstudent", (req, res) => {
    // fetch data from the form


    const { phone } = req.query;

    let qry = "select * from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false })
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    });
})


app.get("/updatesearch", (req, res) => {

    const { phone } = req.query;

    let qry = "select * from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false, data: results })
            } else {

                res.render("update", { mesg1: false, mesg2: true })

            }

        }
    });
})
app.get("/updatestudent", (req, res) => {
    // fetch data

    const { phone, name, gender } = req.query;
    let qry = "update test set username=?, gender=? where phoneno=?";

    mysql.query(qry, [name, gender, phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("update", { umesg: true })
            }
        }
    })

});

app.get("/removestudent", (req, res) => {

    // fetch data from the form


    const { phone } = req.query;

    let qry = "delete from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {

                res.render("delete", { mesg1: false, mesg2: true })

            }

        }
    });
});









// Creating Server

app.listen(port,(err)=>{
    if(err)
    throw err
})