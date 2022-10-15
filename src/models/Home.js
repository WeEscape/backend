const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Home',
        {
            inviteCode: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            paranoid: false,
            underscored: true,
            timestamps: true
        }
    );
};