const sql = require("../config/connectMysql");
const { subMonths ,format } = require("date-fns")

async function getAllOrder(){
    return new Promise((resolve, reject)=>{
        const currentDate = new Date();
        const nextDate = new Date(currentDate)
        nextDate.setDate(currentDate.getDate()+1)
        var formattedDate = format(currentDate, 'yyyy-MM-dd');
        var fmnextDate = format(nextDate, 'yyyy-MM-dd');
        formattedDate = formattedDate + " 00:00:00"
        fmnextDate = fmnextDate + " 00:00:00"
        sql.query(`SELECT ptp_db.order.id, ptp_db.customer.name ,ptp_db.customer.shipping_name , ptp_db.customer.mobile, ptp_db.customer.email, ptp_db.order.order_status_id, ptp_db.order.created_date, ptp_db.order.payment_method, ptp_db.order.shipping_mobile, ptp_db.order.delivered_date, ptp_db.order.shipping_fee , SUM(ptp_db.order_item.total_price) as total, ( sum(ptp_db.order_item.total_price) + ptp_db.order.shipping_fee) as toltalwfee, ptp_db.customer.housenumber_street, ptp_db.staff.name as staffname from ptp_db.order inner join ptp_db.order_item on ptp_db.order.id = ptp_db.order_item.order_id inner join ptp_db.customer on ptp_db.order.customer_id = ptp_db.customer.id inner join ptp_db.staff on ptp_db.order.staff_id = ptp_db.staff.id GROUP BY ptp_db.order_item.order_id ORDER BY ptp_db.order.id DESC`,(err, result)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(result))
                console.log(dataJson)
                resolve(dataJson)
            }
        })
    })
}

function getOrderToday(){
    console.log("today")
    return new Promise((resolve, reject)=>{
        const currentDate = new Date();
        const nextDate = new Date(currentDate)
        nextDate.setDate(currentDate.getDate()+1)
        var formattedDate = format(currentDate, 'yyyy-MM-dd');
        var fmnextDate = format(nextDate, 'yyyy-MM-dd');
        formattedDate = formattedDate + " 00:00:00"
        fmnextDate = fmnextDate + " 00:00:00"
        sql.query(`SELECT ptp_db.order.id, ptp_db.customer.name ,ptp_db.customer.shipping_name , ptp_db.customer.mobile, ptp_db.customer.email, ptp_db.order.order_status_id, ptp_db.order.created_date, ptp_db.order.payment_method, ptp_db.order.shipping_mobile, ptp_db.order.delivered_date, ptp_db.order.shipping_fee , SUM(ptp_db.order_item.total_price) as total, ( sum(ptp_db.order_item.total_price) + ptp_db.order.shipping_fee) as toltalwfee, ptp_db.customer.housenumber_street, ptp_db.staff.name as staffname from ptp_db.order inner join ptp_db.order_item on ptp_db.order.id = ptp_db.order_item.order_id inner join ptp_db.customer on ptp_db.order.customer_id = ptp_db.customer.id inner join ptp_db.staff on ptp_db.order.staff_id = ptp_db.staff.id WHERE ptp_db.order.created_date >= "${formattedDate}" AND ptp_db.order.created_date < "${fmnextDate}" GROUP BY ptp_db.order_item.order_id ORDER BY ptp_db.order.id DESC`,(err, result)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(result))
                resolve(dataJson)
            }
        })
    })
}

async function getOrderYesterday(){
    return new Promise((resolve, reject)=>{
        const currentDate = new Date();
        const preDate = new Date(currentDate)
        preDate.setDate(currentDate.getDate()+1)
        var formattedDate = format(currentDate, 'yyyy-MM-dd');
        var fmpreDate = format(preDate, 'yyyy-MM-dd');
        formattedDate = formattedDate + " 00:00:00"
        fmpreDate = fmpreDate + " 00:00:00"
        sql.query(`SELECT ptp_db.order.id, ptp_db.customer.name ,ptp_db.customer.shipping_name , ptp_db.customer.mobile, ptp_db.customer.email, ptp_db.order.order_status_id, ptp_db.order.created_date, ptp_db.order.payment_method, ptp_db.order.shipping_mobile, ptp_db.order.delivered_date, ptp_db.order.shipping_fee , SUM(ptp_db.order_item.total_price) as total, ( sum(ptp_db.order_item.total_price) + ptp_db.order.shipping_fee) as toltalwfee, ptp_db.customer.housenumber_street, ptp_db.staff.name as staffname from ptp_db.order inner join ptp_db.order_item on ptp_db.order.id = ptp_db.order_item.order_id inner join ptp_db.customer on ptp_db.order.customer_id = ptp_db.customer.id inner join ptp_db.staff on ptp_db.order.staff_id = ptp_db.staff.id WHERE ptp_db.order.created_date >= "${fmpreDate}" AND ptp_db.order.created_date < "${formattedDate}" GROUP BY ptp_db.order_item.order_id ORDER BY ptp_db.order.id DESC` , (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                console.log("success")
                resolve(dataJson)
            }
        })
    })
}

async function getOrderMonth(){
    return new Promise((resolve, reject)=>{
        const currentDate = new Date();
        var currentMonth = format(currentDate, 'MM')
        var currentYear = format(currentDate, 'yyyy')
        sql.query(`SELECT ptp_db.order.id, ptp_db.customer.name ,ptp_db.customer.shipping_name , ptp_db.customer.mobile, ptp_db.customer.email, ptp_db.order.order_status_id, ptp_db.order.created_date, ptp_db.order.payment_method, ptp_db.order.shipping_mobile, ptp_db.order.delivered_date, ptp_db.order.shipping_fee , SUM(ptp_db.order_item.total_price) as total, ( sum(ptp_db.order_item.total_price) + ptp_db.order.shipping_fee) as toltalwfee, ptp_db.customer.housenumber_street, ptp_db.staff.name as staffname from ptp_db.order inner join ptp_db.order_item on ptp_db.order.id = ptp_db.order_item.order_id inner join ptp_db.customer on ptp_db.order.customer_id = ptp_db.customer.id inner join ptp_db.staff on ptp_db.order.staff_id = ptp_db.staff.id WHERE YEAR(ptp_db.order.created_date) = "${currentYear}" AND YEAR(ptp_db.order.created_date) = "${currentMonth}" GROUP BY ptp_db.order_item.order_id ORDER BY ptp_db.order.id DESC` , (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                console.log("success")
                resolve(dataJson)
            }
        })
    })
}

async function getOrderYear(){
    return new Promise((resolve, reject)=>{
        const currentDate = new Date();
        var currentYear = format(currentDate, 'yyyy')
        sql.query(`SELECT ptp_db.order.id, ptp_db.customer.name ,ptp_db.customer.shipping_name , ptp_db.customer.mobile, ptp_db.customer.email, ptp_db.order.order_status_id, ptp_db.order.created_date, ptp_db.order.payment_method, ptp_db.order.shipping_mobile, ptp_db.order.delivered_date, ptp_db.order.shipping_fee , SUM(ptp_db.order_item.total_price) as total, ( sum(ptp_db.order_item.total_price) + ptp_db.order.shipping_fee) as toltalwfee, ptp_db.customer.housenumber_street, ptp_db.staff.name as staffname from ptp_db.order inner join ptp_db.order_item on ptp_db.order.id = ptp_db.order_item.order_id inner join ptp_db.customer on ptp_db.order.customer_id = ptp_db.customer.id inner join ptp_db.staff on ptp_db.order.staff_id = ptp_db.staff.id WHERE YEAR(ptp_db.order.created_date) = "${currentYear}" GROUP BY ptp_db.order_item.order_id ORDER BY ptp_db.order.id DESC` , (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                console.log("success")
                resolve(dataJson)
            }
        })
    })
}

async function getOrderWeek(){
    return new Promise((resolve, reject)=>{
        console.log("week")
        const currentDate = new Date();
        var monday = new Date(currentDate)
        while(true){
            if(monday.getDay() === 1){
                break
            }else{
                monday.setDate(monday.getDate() - 1)
            }
        }
        var nexDate = new Date(currentDate)
        nexDate.setDate(currentDate.getDate() + 1)
        var mondayFormat = format(monday, 'yyyy-MM-dd 00:00:00')
        var nextdayFormat = format(nexDate, 'yyyy-MM-dd 00:00:00')
        console.log(mondayFormat + " " + nextdayFormat)
        sql.query(`SELECT ptp_db.order.id, ptp_db.customer.name ,ptp_db.customer.shipping_name , ptp_db.customer.mobile, ptp_db.customer.email, ptp_db.order.order_status_id, ptp_db.order.created_date, ptp_db.order.payment_method, ptp_db.order.shipping_mobile, ptp_db.order.delivered_date, ptp_db.order.shipping_fee , SUM(ptp_db.order_item.total_price) as total, ( sum(ptp_db.order_item.total_price) + ptp_db.order.shipping_fee) as toltalwfee, ptp_db.customer.housenumber_street, ptp_db.staff.name as staffname from ptp_db.order inner join ptp_db.order_item on ptp_db.order.id = ptp_db.order_item.order_id inner join ptp_db.customer on ptp_db.order.customer_id = ptp_db.customer.id inner join ptp_db.staff on ptp_db.order.staff_id = ptp_db.staff.id WHERE ptp_db.order.created_date >= "${mondayFormat}" AND ptp_db.order.created_date < "${nextdayFormat}" GROUP BY ptp_db.order_item.order_id ORDER BY ptp_db.order.id DESC` , (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                console.log("success")
                resolve(dataJson)
            }
        })
    })
}

async function getpre3month(){
    return new Promise((resolve, reject)=>{
        const curDate = new Date()
        const ThreeMonth = subMonths(curDate, 2)
        const nextDate = new Date(curDate)
        nextDate.setDate(curDate.getDate() + 1)
        const nextDateFor = format(nextDate, "yyyy-MM-dd 00:00:00")
        const threeFor = format(ThreeMonth, "yyyy-MM-dd 00:00:00")
        console.log(nextDateFor + " " + threeFor)
        sql.query(`SELECT ptp_db.order.id, ptp_db.customer.name ,ptp_db.customer.shipping_name , ptp_db.customer.mobile, ptp_db.customer.email, ptp_db.order.order_status_id, ptp_db.order.created_date, ptp_db.order.payment_method, ptp_db.order.shipping_mobile, ptp_db.order.delivered_date, ptp_db.order.shipping_fee , SUM(ptp_db.order_item.total_price) as total, ( sum(ptp_db.order_item.total_price) + ptp_db.order.shipping_fee) as toltalwfee, ptp_db.customer.housenumber_street, ptp_db.staff.name as staffname from ptp_db.order inner join ptp_db.order_item on ptp_db.order.id = ptp_db.order_item.order_id inner join ptp_db.customer on ptp_db.order.customer_id = ptp_db.customer.id inner join ptp_db.staff on ptp_db.order.staff_id = ptp_db.staff.id WHERE ptp_db.order.created_date >= "${threeFor}" AND ptp_db.order.created_date < "${nextDateFor}" GROUP BY ptp_db.order_item.order_id ORDER BY ptp_db.order.id DESC` , (err, res)=>{
            if(err){
                reject(err)
            }else{
                const dataJson = JSON.parse(JSON.stringify(res))
                console.log("success")
                resolve(dataJson)
            }
        })
    })
}

module.exports = [getAllOrder, getOrderToday, getOrderYesterday, getOrderYear, getOrderMonth , getOrderWeek, getpre3month]