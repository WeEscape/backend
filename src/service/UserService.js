const { User } = require('../models');
const dotenv = require("dotenv");
dotenv.config();

module.exports = class UserService {

    async getUser(userId) {
        // 이미 가입 했었던 유저인지 확인
        let user = await User.findOne({
            where: {
                id: userId
            },
        });
        return user
    }

    async deleteUser(userId) {
        await User.destroy(
            {
                where: { id: userId}
            }
        );
    }
}