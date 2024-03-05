const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const {getCutomerByID} = require("../models/customerModel")

Router.get("/getCustomer" , async (req, res)=>{
    const check = checkLogin(req)
    if(check){
        const id_cus = req.query.id_cus
        const dataCus = await getCutomerByID(id_cus)
        console.log(dataCus)
        if(dataCus !== false){
            res.json({"error" : false , "cusData" : dataCus})
        }else{
            res.json({"error" : true})
        }
    }else{
        res.redirect("/admin/login")
    }
})

module.exports = Router