const mysql=require("mysql")
const con= mysql.createConnection(
    {

        host:"localhost",
        user:"root",
        password:"",
        database:"project1",
        port:3307

    }
);
con.connect((err)=>{
    if(err) throw err;
    console.log("connection created!!");
})
module.exports.con=con;