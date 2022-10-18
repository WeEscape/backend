const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'UserTask',
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            task_id: {
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