const axios = require("axios");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const { user } = require("../../models");
const AuthService = require('../../service/AuthService');

module.exports = async (req, res) => {

  try {


    const { accessToken, refreshToken } = req.body;
    const kakaoUserInfo = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    const snsUserName = kakaoUserInfo.data.properties.nickname;
    const snsUserEmail = kakaoUserInfo.data.kakao_account.email;
    const snsUserId = kakaoUserInfo.data.id;
    const profileUrl =  kakaoUserInfo.data.properties.thumbnail_image;

    const authService = new AuthService();
    const loginUser = await authService.login(snsUserName, snsUserEmail, "kakao", snsUserId, accessToken, refreshToken, profileUrl);

    // 4. jwtAccessToken, jwtRefreshToken 발급
    const jwtAccessToken = authService.generateAccessToken(loginUser.id);
    const jwtRefreshToken = authService.generateRefreshToken();

    res.status(200).json({
      "accessToken": jwtAccessToken,
      "refreshToken": jwtRefreshToken,
    });
  
  } catch (e) {
    console.log(e);
    res.status(404).send({ message: e.message });
  }
};
