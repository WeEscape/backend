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
        const refreshToken = user.sns_refresh_token; // apple user refreshToken

        // make client_secret
        const algorithm = process.env.ALG;  // 알고리즘
        const keyid = process.env.KID;  // [key ID]
        const issuer = process.env.ISS;  // [팀 ID = App ID Prefix]
        const expiresIn = 15777000;         // 토큰만료시간 6개월(초),  토큰생성시간 -> jwt.sign()에 전달안해주면 현재시간으로 세팅
        const audience = "https://appleid.apple.com";
        const subject = process.env.SUB;  // [앱번들아이디 또는 서비스아이디]"
        const authkey = fs.readFileSync(process.env.AUTHKEY, 'utf8');

        const client_secret = jwt.sign(
            {},
            authkey,
            {
                algorithm: algorithm,
                keyid: keyid,
                issuer: issuer,
                audience: audience,
                subject: subject,
                expiresIn: expiresIn
            });

        axios.post(
            'https://appleid.apple.com/auth/revoke',
            querystring.stringify({
                client_id: subject,
                client_secret: client_secret,
                token: refreshToken,
                token_type_hint: 'refresh_token',
            }),
            {
                headers: {
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



    } catch (e) {
        res.status(404).send({ message: e.message });
    }
};
