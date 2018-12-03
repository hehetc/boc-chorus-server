var express = require('express');
var users = require('../models/person');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var userId = -1;
    var username = '曾曾曾';
    users.getUserByName(username,function (userInfos) {
        console.log(userInfos);
        if(userInfos.length == 0) {
            users.create(username,function (add_result) {
                userId = add_result.insertId;
            })
        }else {
            userId = userInfos[0].F_ID;
        }

        var result = {
            userId: userId
        };
        res.send(result);
    });

});

/**
 * 查找是否有F_User = username，若无则创建用户（插入用户名-即昵称，avatarUrl），若有，则返回这个用户对象。
 * POST /person/
 * param：username=''
 */
router.post('/',function (req, res) {
    var userId = -1;
    var username = req.body.username;
    var avatarUrl = req.body.avatarUrl;
    var user = []; //待添加的
    user.username = username;
    user.avatarUrl = avatarUrl;
    console.log("person后台接口中，收到的待向数据库添加的当前用户：");
    console.log(user);

    users.getUserByName(username,function (userInfos) {
        console.log("【routes-person.js-getUserByName】查库返回的根据username查找userInfo的结果：");
        console.log(userInfos);
        if(userInfos.length === 0) {
            console.log("【routes-person.js-getUserByName】库里没找到，开始create");
            users.create(user,function (add_result) {
                userId = add_result.insertId;
                var result = {
                    userId: userId,
                };
                console.log("【routes-person.js-getUserByName】create用户返回的结果:");
                console.log(result);
                res.send(result); //原先没查到用户，创建用户：返回自动生成的insertId，作为userId
            })
        }else {
            console.log("【routes-person.js-getUserByName】库里找到了该用户：");
            userId = userInfos[0].F_ID;
            avatarUrl = userInfos[0].F_PhotoUrl;
            var result = {
                userId: userId,
                avatarUrl: avatarUrl
            };
            console.log(result);
            res.send(result); //已存在用户，返回用户userId和avatarUrl
        }

    });
});

/**
 * 用于更新某个用户的头像使用的
 */
router.post('/update',function (req, res) {
    var user_id = req.body.user_id;
    var avatar_url = req.body.avatar_url;
    var result = {
        code: 1
    };
    users.updateUserById(user_id,avatar_url,function (update_res) {
        console.log(update_res);
        res.send(result);
    })

});



module.exports = router;