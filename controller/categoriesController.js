const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")

Router.get("/Categories", async (req,res)=>{
    const check = checkLogin(req)
    if(check){
        const usname = req.session.usname
        res.render("./page/listCate", {usname})
    }else{
        res.redirect("/admin/login")
    } 
})

module.exports = Router