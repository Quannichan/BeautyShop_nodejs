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

async function deleteCustomer(id){
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT id FROM ptp_db.order WHERE customer_id in (${id})`, (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataOrder = JSON.parse(JSON.stringify(res))
                var orderArr = []
                for(order of dataOrder){
                    orderArr.push(order.id)
                }
                const orderStr = orderArr.join(", ")
                if(orderArr.length){
                    sql.query(`DELETE from ptp_db.order_item WHERE order_id in (${orderStr})`, (err1, res1)=>{
                        if(err1){
                            reject(err1)
                        }else{
                            sql.query(`DELETE from ptp_db.order WHERE id in (${orderStr})`, (err2, res2)=>{
                                if(err2){
                                    reject(err2)
                                }else{
                                    sql.query(`DELETE from ptp_db.customer WHERE id in (${id})`, (err2, res2)=>{
                                        if(err2){
                                            reject(err2)
                                        }else{
                                            resolve(true)
                                        }
                                    }) 
                                }
                            }) 
                        }
                    })
                }else{
                    sql.query(`DELETE from ptp_db.customer WHERE id in (${id})`, (err2, res2)=>{
                        if(err2){
                            reject(err2)
                        }else{
                            resolve(true)
                        }
                    }) 
                }
            }
        })
    })
    
}

async function UpdateCus(idcus, name, email, mob, logFrom, wardID, address, shipName, shipmob, isActive){
    return new Promise((resolve, reject)=>{
        sql.query('SET FOREIGN_KEY_CHECKS = 0;')
        sql.query(`UPDATE ptp_db.customer set name = '${name}', mobile = '${mob}', email = '${email}', login_by = '${logFrom}', ward_id = '${wardID}', shipping_name = '${shipName}', shipping_mobile = '${shipmob}', housenumber_street = '${address}', is_active = ${isActive} WHERE id = ${idcus}`, (err)=>{
            if(err){
                reject(err)
            }else{
                resolve(true)
            }
        })
    })
}

async function AddCustomer(name, email, pass, mob, logFrom, wardID, address, shipName, shipmob, isActive){
    return new Promise((resolve, reject)=>{
        console.log("addCus")
        sql.query(`INSERT INTO ptp_db.customer (name, mobile, email, password, login_by, ward_id, shipping_name, shipping_mobile, housenumber_street, is_active)  VALUES ('${name}','${mob}', '${email}', '${pass}', '${logFrom}', '${wardID}', '${shipName}', '${shipmob}', '${address}', ${isActive})`, (err)=>{
            if(err){
                reject(err)
            }else{
                resolve(true)
            }
        })
    })
}
module.exports.AddCustomer = AddCustomer
module.exports.changeShippingName = changeShippingName
module.exports.getCustomer = getCustomer
module.exports.getCutomerByID = getCutomerByID
module.exports.deleteCustomer = deleteCustomer
module.exports.UpdateCus = UpdateCus
