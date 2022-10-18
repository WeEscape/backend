const axios = require("axios");
const fs = require("fs");
const querystring = require('querystring');
const jwt = require("jsonwebtoken");
const UserService = require('../../service/UserService');

module.exports = async (req, res) => {
    try {

        const userService = new UserService();
        const userId = req.userId;
        if (!userId) {
            // access token 만료
            res.status(401).send({
                message: 'invalide access token'
            });
        }
        const user = userService.getUser(userId);
        const kakaoUserId = user.sns_user_id; 
        
        axios.post(
            'https://kapi.kakao.com/v1/user/unlink',
            querystring.stringify({
                'target_id_type': 'user_id',
                'target_id': kakaoUserId,
            }),
            {
                headers: {
                    "Authorization": `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        ).then(function (response) {
            userService.deleteUser(userId);
            console.log("revoke success");
            console.log(response);
            res.status(200).send();
        }).catch(function (error) {
            console.log("revoke fail");
            console.log(error);
            res.status(404).send({ message: e.message });
        });
        
        res.status(200).send({  message: 'success' });
    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};
