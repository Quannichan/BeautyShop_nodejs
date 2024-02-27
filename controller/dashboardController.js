const express = require("express")
const Router = express.Router()
const [checkLogin]= require("../models/loginModel")
const [getTotalOrder,getTotalCancelOrder,getTotal]= require("../models/dashboardModel")
const [getAllOrder,getOrderToday, getOrderYesterday, getOrderYear, getOrderMonth, getOrderWeek, getpre3month] = require("../models/orderModel")

Router.get("/dashboard/today", async (req, res)=>{
    const check = checkLogin(req)
    console.log("check")
    if(check){
        const order = await getOrderToday()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/yesterday", async (req, res)=>{
    const check = checkLogin(req)
    console.log("check")
    if(check){
        const order = await getOrderYesterday()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/this_year", async (req, res)=>{
    const check = checkLogin(req)
    console.log("check")
    if(check){
        const order = await getOrderYear()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/this_month", async (req, res)=>{
    const check = checkLogin(req)
    console.log("check")
    if(check){
        const order = await getOrderMonth()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/this_week", async (req, res)=>{
    const check = checkLogin(req)
    console.log("check")
    if(check){
        const order = await getOrderWeek()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})

Router.get("/dashboard/pre_three_month", async (req, res)=>{
    const check = checkLogin(req)
    console.log("check")
    if(check){
        const order = await getpre3month()
        const totalOrder = getTotalOrder(order)
        const totalCancelOrder = getTotalCancelOrder(order)
        const totalIncome = getTotal(order)
        res.json({'orderCount':`${totalOrder}`,'orderCancel':`${totalCancelOrder}`,'totalIncome':`${totalIncome}`,'order':order})
    }else{
        res.redirect("/admin/login")
    } 
})
module.exports = Router