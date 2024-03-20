const sql = require("../config/connectMysql");

async function getProvice(){
    return new Promise((resolve, reject)=>{
        sql.query("SELECT * FROM ptp_db.province " , (err, res)=>{
            if(err){
                reject(false)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}

async function getDistrict(){
    return new Promise((resolve, reject)=>{
        sql.query("SELECT * FROM ptp_db.district " , (err, res)=>{
            if(err){
                reject(false)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}


async function getWard(){
    return new Promise((resolve, reject)=>{
        sql.query("SELECT * FROM ptp_db.ward " , (err, res)=>{
            if(err){
                reject(false)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}

async function getDistrictByProvinceID(id_province){
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM ptp_db.district WHERE province_id = '${id_province}'` , (err, res)=>{
            if(err){
                reject(false)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}

async function getWardbyDistrictID(id_district){
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM ptp_db.ward WHERE district_id = '${id_district}'` , (err, res)=>{
            if(err){
                reject(false)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}

async function getTransportByProvince(province_id){
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM ptp_db.transport WHERE province_id = '${province_id}'` , (err, res)=>{
            if(err){
                reject(false)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                resolve(dataJson)
            }
        })
    })
}

async function getDis_ProvinceByWard(wardID){
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT district_id from ptp_db.ward WHERE id = '${wardID}'`,(err, res)=>{
            if(err){
                reject(err)
            }else{
                const data1 = JSON.parse(JSON.stringify(res))
                const districtID = data1[0].district_id
                sql.query(`SELECT province_id FROM ptp_db.district WHERE id = '${districtID}'` , (err1, res1)=>{
                    const data2 = JSON.parse(JSON.stringify(res1))
                    const provinceID = data2[0].province_id
                    const data = {"distID" : districtID, "provinID" : provinceID , "wardID" : wardID}
                    console.log(data)
                    resolve(data)
                })
            }
        })
    })
}

module.exports.getProvice = getProvice
module.exports.getDistrict = getDistrict
module.exports.getWard = getWard
module.exports.getDistrictByProvinceID = getDistrictByProvinceID
module.exports.getWardbyDistrictID = getWardbyDistrictID
module.exports.getTransportByProvince = getTransportByProvince
module.exports.getDis_ProvinceByWard = getDis_ProvinceByWard