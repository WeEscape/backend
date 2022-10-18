const AuthService = require('../../service/AuthService');

module.exports = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const authService = new AuthService();
    const verifiedToken = authService.verifyRefreshToken(refreshToken);

    if (verifiedToken == null) {
      res.status(401).send({message : "invalide RefreshToken"})
    }

    const newAccessToken = authService.refreshAccessToken(verifiedToken);

    console.log("refreshToken !");
    console.log(`new access token : ${newAccessToken}`);

    res.status(200).json({
      "accessToken": newAccessToken,
      "refreshToken": verifiedToken,
    });

  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};
