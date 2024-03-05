const sql = require("../config/connectMysql");

async function getAllStaff(){
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM ptp_db.staff` , (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                console.log("by id")
                resolve(dataJson)
            }
        })
        
    })
}

async function getStaffById(){

}

module.exports = [getAllStaff , getStaffById]