const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'TaskDidDate',
        {
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