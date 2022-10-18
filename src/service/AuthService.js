const { User, Home } = require('../models');
const crypto = require("crypto");
const getRandomColor = require('../util/getRandomColor');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = class AuthService {
    async login(name, email, snsType, snsUserId, snsAccessToken, snsRefreshToken, profileUrl) {

        // 이미 가입 했었던 유저인지 확인
        let user = await User.findOne({
            where: {
                sns_user_id: snsUserId
            },
        });

        // 이미존재하는 유저 였다면 snsAccessToken,  snsRefreshToken 업데이트
        if (user) {
            user.set({
                sns_access_token: snsAccessToken,
                sns_refresh_token: snsRefreshToken
            })
            await user.save();
            return user;
        }

        // 회원가입 
        const uniqueString = crypto.randomBytes(20).toString('hex');
        const newhome = await Home.create({
            inviteCode: uniqueString
        });
        const randomColor = getRandomColor();
        user = await User.create({
            name: name,
            email: email,
            home_id: newhome.id,
            profile_color: randomColor,
            profile_url: profileUrl,
            sns_access_token: snsAccessToken,
            sns_refresh_token: snsRefreshToken,
            sns_user_id: snsUserId,
            sns_type: snsType
        });
        return user
    }

    generateAccessToken(userId) {
        const accessToken = jwt.sign(
            {
                id: userId
            },
            process.env.JWT_SECRET_KEY,
            {
                algorithm: 'HS256',
                expiresIn: '12h',
            });

        return accessToken;
    }

    verifyAccessToken(aceessToken) {
        const verificationResult = jwt.verify(
            aceessToken,
            process.env.JWT_SECRET_KEY,
            {
                algorithm: 'HS256'
            });
        return verificationResult;
    }

    async refreshAccessToken(refreshToken) {
        let user = await User.findOne({
            where: {
                sns_refresh_token: refreshToken
            },
        });

        const newToken = this.generateAccessToken(user.id);
        return newToken;
    }

    generateRefreshToken() {

        const refreshToken = jwt.sign(
            {},  // refresh token은 payload 없이 발급
            process.env.REFRESH_TOKEN,
            {
                algorithm: 'HS256',
                expiresIn: '14d',
            });

        return refreshToken;
    }

    verifyRefreshToken(refreshToken) {
        try {
            const verificationResult = jwt.verify(
                refreshToken,
                process.env.JWT_SECRET_KEY,
                {
                    algorithm: 'HS256'
                });
            return verificationResult;
        }
        catch {
            return null
        }
    }
}