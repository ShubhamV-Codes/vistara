const express= require("express");
const app = express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js")
const cookieParser = require("cookie-parser");


app.use(cookieParser("secretcode"));

app.get("/getSignedCookie",(req,res)=>{
    res.cookie("color","red",{signed:true});
    res.send("DONE");
});
app.get("/verify",(req,res)=>{
    res.send(req.signedCookies);
    res.send("verified");
});

app.get("/getcookies", (req,res)=>{
    res.cookie("Cookie-1","shubham");
    res.cookie("Cookie-2","Vishwakarma");
    res.send("Cookies has been sent");
});
app.get("/greet",(req,res)=>{
    let {name="anonymous"}=req.cookies;
    res.send(`Hi,${name}`);
})
app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("Hi,I am Root!");
});

app.use("/users",users);
app.use("/posts",posts);

app.listen(3000,()=>{
    console.log("Server is Listening to 3000");
});
