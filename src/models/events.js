const connection = require('../helpers/mysql');

module.exports = {
    index : function(){
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM events",function(error,result) {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    store : function (setData) {
        return new Promise((resolve,reject)=>{
            connection.query("INSERT INTO events SET?",setData,function (error,result) {
                if (error) {
                    reject(error)
                }
                else{
                    if(result.affectedRows <=0){
                        resolve(result)
                    }
                    const newRes = {
                        msg : 'Events Has been Inserted!',
                        data : setData
                    }
                    resolve(newRes)
                }
            })
        })
    },
    destroy : function (id) {
        return new Promise((resolve,reject)=>{
            connection.query("DELETE FROM events WHERE id=?",id,function(error,result) {
                if (error) {
                    reject(error)
                }
                if (result.affectedRows <= 0) {
                    resolve(result)
                }
                const newRes = {
                    msg : "Delete Success!"
                }
                resolve(newRes)
            })
        })
    },
    edit : function(setData,id){
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE events SET ? WHERE id= ?",[setData,id],function (error,result) {
                if (error) {
                    reject(error)
                }
                else{
                    if(result.affectedRows <=0){
                        resolve(result)
                    }
                    const newRes = {
                        msg : 'Book Has been Change!',
                        data : setData
                         }
                    resolve(newRes)
                }
            })
        })
    },
    
    indexSearch : function(startAt,endAt,rule) {
        return new Promise((resolve,reject)=>{
            connection.query(`SELECT events.id,events.title,events.participan,events.image,events.date,events.note,events.location FROM events WHERE ${rule.by} LIKE ? ORDER BY ${rule.order} ${parseInt(rule.sort) ? 'DESC' : 'ASC'} LIMIT ? OFFSET ? `,['%'+rule.search+'%',endAt,startAt],function (error,result) {
                if (error) {
                    reject(error)
                }
                const resData = {
                    msg : "List Events",
                    data : result
                }
                resolve(resData)
            })
        })
    },
    getCount : function () {
        return new Promise((resolve,reject)=>{
            connection.query("SELECT COUNT(*) as total FROM events",function(error,result) {
                if (error) {
                    reject(error)
                }
                resolve(result[0].total)       
            })
        })
    },
    getDetails : function (id) {
        return new Promise((resolve,reject)=>{
            connection.query("SELECT events.id,events.title,events.participan,events.image,events.date,events.note,events.location FROM events WHERE id= ?",id,function(error,result) {
                if (error) {
                    reject(error)
                }
                else{
                    if (result.length > 0) {
                        const newRes = {
                            data : result[0]
                        }
                        resolve(newRes)
                    } else {
                        const failedRes = {
                            msg : "Data Events not found!!"
                        }
                        resolve(failedRes)
                    }
                }   
            })
        })
    }
}