
let express=require("express");
let app=express();
let port=3001;
let path=require("path");
let method_override=require("method-override");
app.use(method_override("_method"));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
//let Schema=require("./schema");
let database=require("./database/index.js");

app.listen(port , ()=>{
  console.log(`App is listening ${port} port`)
});

app.get("/",(req,res)=>{
  let q=`select count(*) from tabledata`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      console.log(result[0]["count(*)"]);
      let count=result[0]["count(*)"];
      res.render("home.ejs",{count});
    })
  }
  catch(err){
     console.log(err);
  }
  connection.end();
})

app.get("/users",(req,res)=>{
  let q=`select * from tabledata`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      //console.log(result[0]["count(*)"]);
      //let count=result[0]["count(*)"];
        res.render("users.ejs",{result});
    })
  }
  catch(err){
     console.log(err);
  }
})

app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`select *from tabledata where id='${id}'`;
  console.log(id);
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      //console.log(result[0]["count(*)"]);
      //let count=result[0]["count(*)"];
      let user=result[0];
      res.render("edit.ejs",{user});
    })
  }
  catch(err){
     console.log(err);
  }
  
})

app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password : formpass , username: newusername}=req.body;
    console.log(req.body);
    let q=`select *from tabledata where id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      let user=result[0];
      if(err) throw err;
      //console.log(result[0]["count(*)"]);
      //let count=result[0]["count(*)"];
      if(formpass != user.password){
           res.send("wrong password");
           console.log(formpass);
      }
      else{
        let q2=`update tabledata set username='${newusername}' where id='${id}'`;
        connection.query(q2,(err,result)=>{
          if(err) throw err;
          res.redirect("/users");
        });
      }
    });
  }
  catch(err){
     console.log(err);
  }
});

//let q="insert into tabledata(id,username,email,password) values ?";

  // console.log(createRandomUser());