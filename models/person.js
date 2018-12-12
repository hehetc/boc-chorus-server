var db = require('../utils/dbConnection');



module.exports = {
    /**
     * 第一次使用的时候创建用户，通过检索是否在数据库中有记录
     * @param user
     */
    create: function create(user,callback) {
        var sql = 'INSERT INTO t_user(F_ID,F_Name,F_PhotoUrl)VALUES(0,?,?)';
        var params = [user.username, user.avatarUrl];
        db.connection.query(sql,params,function (err,result) {
            if(err){
                console.log(err.message);
                return;
            }
            console.log("【model-person.js-create:】INSERT SUCCESS！t_user表里成功插入的用户",result);
            callback(result);

        });
    },

    /**
     * 通过用户名查找用户
     * @param name
       @return  result整个用户对象
     */
    getUserByName: function getUserByName(name,callback) {
        var sql = 'SELECT * FROM t_user WHERE F_Name=?';
        var params = [name];
        db.connection.query(sql,params,function (err,result) {
           if(err){
               console.log(err.message);
               return;
           }
           callback(result); //返回result
        });
    },

    /**
     * 传入用户名,并将用户的信息更新
     * @param name
     */
    updateUserInfoById: function updateUserInfoById(user_id,realname,mobile,callback) {
        console.log("【model-person.js-updateUserInfoById】收到的参数");
        console.log(realname,mobile);
        var sql = 'UPDATE t_user SET F_Realname = ?, F_Mobile = ?  WHERE F_ID = ?';
        var params = [realname, mobile, user_id];
        db.connection.query(sql,params,function (err,result) {
            console.log("asf");     
            if(err){
                console.log(err.message);
                return;
            }
            callback(result);
        })
    }

}