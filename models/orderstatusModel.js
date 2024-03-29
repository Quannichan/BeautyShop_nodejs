const sql = require("../config/connectMysql")

async function getAllstatusData(){
    return new Promise((resolve, reject)=>{
        sql.query("SELECT * FROM ptp_db.status",(err, res)=>{
            if(err){
                reject(err)
            }else{
                const data = JSON.parse(JSON.stringify(res))
                resolve(data)
            }
        })
    })
}

module.exports.getAllstatusData = getAllstatusData