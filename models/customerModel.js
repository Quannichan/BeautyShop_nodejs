const sql = require("../config/connectMysql");

async function changeShippingName(id,new_name , ship_mobile, address){
    return new Promise((resolve, reject)=>{
        sql.query(`UPDATE ptp_db.customer set ptp_db.customer.shipping_name = '${new_name}' , ptp_db.customer.shipping_mobile = '${ship_mobile}' , ptp_db.customer.housenumber_street = '${address}'  WHERE id = ${id}` , (err, res)=>{
            if(err){
                reject(false)
            }else{
                resolve(true)
            }
        })
    })
}

async function getCustomer(){
    return new Promise((resolve, reject)=>{
        sql.query('SELECT * FROM ptp_db.customer' , (err, res)=>{
            if(err){
                reject(false)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}

async function getCutomerByID(id){
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM ptp_db.customer WHERE ptp_db.customer.id = ${id}` , (err, res)=>{
            if(err){
                reject(false)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}

module.exports.changeShippingName = changeShippingName
module.exports.getCustomer = getCustomer
module.exports.getCutomerByID = getCutomerByID