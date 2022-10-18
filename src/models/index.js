const sequelize = require('./database');

const sequelizeModels = function ({ sequelize, models }) {
  return models.reduce((sequelized, model) => {
    return {
      ...sequelized,
      [model]: require(`./${model}`)(sequelize),
    };
  }, {});
};
const models = [
  'Home',
  'Task',
  'TaskCategory',
  'TaskDidDate',
  'User',
  'UserTask',
];
const model = sequelizeModels({ sequelize, models });
// console.dir(model);

// 1:n associations

model.Home.hasMany(model.User);
model.User.belongsTo(model.Home);

model.Home.hasMany(model.TaskCategory);
model.TaskCategory.belongsTo(model.Home);

model.TaskCategory.hasMany(model.Task);
model.Task.belongsTo(model.TaskCategory);

model.Task.hasMany(model.TaskDidDate);
model.TaskDidDate.belongsTo(model.Task);


// n:m association
model.User.belongsToMany(model.Task, {
  through: 'UserTask',
  foreignKey: 'user_id',
});
model.Task.belongsToMany(model.User, {
  through: 'UserTask',
  foreignKey: 'task_id',
});

module.exports = { sequelize, ...model };