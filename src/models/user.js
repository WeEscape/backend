const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'User',
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(300),
                allowNull: false,
            },
            home_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            profile_url: {
                type: DataTypes.STRING(2000),
                allowNull: true,
            },
            profile_color: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            sns_access_token: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            sns_refresh_token: {
                type: DataTypes.STRING(200),
                allowNull: true,
                unique: true
            },
            sns_user_id: {
                type: DataTypes.STRING(200),
                allowNull: false,
                unique: true
            },
            sns_type: {
                type: DataTypes.STRING(100),
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