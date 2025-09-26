const express= require("express");
const router =express.Router();

//INDEX-USER
router.get("/",(req,res)=>{
    res.send("GET for user");
});

//SHOW-USER
router.get("/:id",(req,res)=>{
    res.send("GET for user id");
});

//POST-USER
router.post("/",(req,res)=>{
    res.send("POST for user");
});

//DELETE-USER
router.delete("/:id",(req,res)=>{
    res.send("DELETE for user id");
});

module.exports = router;