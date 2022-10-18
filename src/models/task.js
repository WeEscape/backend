const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Task',
        {
            categoty_id: {      
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            home_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            register_day: {     // 등록 요일: 월,화,수, ..
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            register_date: {    // 등록 날짜: 1~31
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            is_last_day: {    // 마지막일 여부
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            repeat_cycle: {    // 반복 간격: 1, 7, 30
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            notice_available: {    // 알림 여부
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            memo: {    
                type: DataTypes.STRING(300),
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