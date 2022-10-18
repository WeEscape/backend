const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'TaskCategory',
        {
            name: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            home_id: {
                type: DataTypes.INTEGER,
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