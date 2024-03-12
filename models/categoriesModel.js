const sql = require("../config/connectMysql");

async function getAllCate(){
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM ptp_db.category`, (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}

module.exports.getAllCate = getAllCate