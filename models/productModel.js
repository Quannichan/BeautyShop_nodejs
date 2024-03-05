const e = require("express");
const sql = require("../config/connectMysql");

async function getAllProduct(){
    return new Promise((resolve, reject)=>{
        sql.query("SELECT * FROM ptp_db.product" , (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}

async function getProductByID(id){
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM ptp_db.product WHERE product.id = ${id}` , (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}



module.exports = [getAllProduct, getProductByID]