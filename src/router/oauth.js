const router = require("express").Router();
const { socialLogin, kakaoLogin, appleLogin, appleRevoke, refreshToken } = require("../controller/oauth");

router.post("/login", socialLogin);
router.post("/kakaoLogin", kakaoLogin);
router.post("/appleLogin", appleLogin);
router.post("/appleRevoke", appleRevoke);
router.post("/refreshToken", refreshToken);

module.exports = router;
