const express= require("express");
const router =express.Router();

//INDEX-POST
router.get("/",(req,res)=>{
    res.send("GET for POST");
});

//SHOW-POST
router.get("/:id",(req,res)=>{
    res.send("GET for post id");
});

//POST-POST
router.post("/",(req,res)=>{
    res.send("POST for post");
});

//DELETE-POST
router.delete("/:id",(req,res)=>{
    res.send("DELETE for post id");
});

module.exports=router;