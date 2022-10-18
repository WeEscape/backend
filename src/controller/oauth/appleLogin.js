const axios = require("axios");
const { response } = require("express");
const { user } = require("../../models");
const fs = require("fs");
const querystring = require('querystring');
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const AuthService = require('../../service/AuthService');

module.exports = async (req, res) => {
  const { 
    snsUserName,
    snsUserEmail,
    snsUserId,
    authorizeCode 
  } = req.body;

  try {

    /*--------------------- 1. verify  identityToken -------------------------*/
    // const applePublicKeysRes = await axios.get("https://appleid.apple.com/auth/keys");
    // const applePublicKeys = applePublicKeysRes.data

    // const client = jwksClient({
    //   jwksUri: 'https://appleid.apple.com/auth/keys',
    // });

    // const tokenDecodedHeader = jwt_decode(identityToken, { header: true });
    // const kid = tokenDecodedHeader.kid;
    // const alg = tokenDecodedHeader.alg;


    // const validKey = applePublicKeys.keys.filter(item => item['kid'] === kid && item['alg'] === alg)[0];
    // const validKid = validKey.kid;

    // const signingKey = await client.getSigningKey(validKid);
    // const publicKey = signingKey.getPublicKey();

    // // verify identityToken result
    // const verificationResult = jwt.verify(identityToken, publicKey);
    // console.dir(verificationResult);

    // const snsUserEmail = verificationResult.email;
    // const snsUserId = verificationResult.sub;

    /*--------------------- 2. generate access token, refresh token -------------------------*/

    // 2.1 make client_secret
    const algorithm = process.env.ALG;  // 알고리즘
    const keyid = process.env.KID;  // [key ID]
    const issuer = process.env.ISS;  // [팀 ID = App ID Prefix]
    const expiresIn = 15777000;         // 토큰만료시간 6개월(초),  토큰생성시간 -> jwt.sign()에 전달안해주면 현재시간으로 세팅
    const audience = "https://appleid.apple.com";
    const subject = process.env.SUB;  // [앱번들아이디 또는 서비스아이디]"
    // const authkey = fs.readFileSync(process.env.AUTHKEY, 'utf8');
    const authkey = process.env.AUTHKEY_STR;
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
      
    // 2.2 snsAccessToken, snsRefreshToken 발행
    const tokenresult = await axios.post(
      'https://appleid.apple.com/auth/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code: authorizeCode,
        client_secret: client_secret,
        client_id: process.env.SUB,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const snsAccessToken = tokenresult.data.access_token;
    const snsRefreshToken = tokenresult.data.refresh_token;
    const profileUrl = "";

    // 3. user 로그인
    const authService = new AuthService();
    const loginUser = await authService.login(snsUserName, snsUserEmail, "apple", snsUserId, snsAccessToken, snsRefreshToken, profileUrl);

    // 4. jwtAccessToken, jwtRefreshToken 발급
    const accessToken = authService.generateAccessToken(loginUser.id);
    const refreshToken = authService.generateRefreshToken();

    res.status(200).json({
      "accessToken": accessToken,
      "refreshToken": refreshToken,
    });

  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};
