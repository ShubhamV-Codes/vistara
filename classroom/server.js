const express= require("express");
const app = express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session = require("express-session");
const flash=require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
};

app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.failure=req.flash("failure"); 
    next();   
})

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name= name;

    if(name==="anonymous"){
       req.flash("failure" , "Some Error Occured");
    }else{
      req.flash("success" , "User Registered SuccessFully");
    }  
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name });
});
// app.get("/reqCount",(req,res)=>{
//     if(req.session){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You sent request ${req.session.count} times`);
// });
app.get("/test",(req,res)=>{
    res.send("Test Successful");
});

app.listen(3000,()=>{
    console.log("Server is Listening to 3000");
});
