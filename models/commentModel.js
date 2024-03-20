const sql = require("../config/connectMysql")

async function getAllComment(){
    return new Promise((resolve, reject)=>{
        sql.query("SELECT ptp_db.product.featured_image, ptp_db.comment.email,  ptp_db.comment.fullname, ptp_db.comment.star, ptp_db.comment.created_date, ptp_db.comment.description from ptp_db.comment join ptp_db.product on ptp_db.product.id = ptp_db.comment.product_id;", (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                console.log(dataJson)
                resolve(dataJson)
            }
        })
    })
}

module.exports.getAllComment = getAllComment