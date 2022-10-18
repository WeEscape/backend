const socialLogin = require("./socialLogin");
const kakaoLogin = require("./kakaoLogin");
const appleLogin = require("./appleLogin");
const appleRevoke = require("./appleRevoke");
const refreshToken = require("./refreshToken");
//kakao랑 구글 redirect url 설정..!(아마)

module.exports = {
  socialLogin,
  kakaoLogin,
  appleLogin,
  appleRevoke,
  refreshToken
};
