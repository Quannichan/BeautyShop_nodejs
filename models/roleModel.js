const sql = require("../config/connectMysql")

async function getRole(){
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM ptp_db.role`, (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}

module.exports.getRole = getRole