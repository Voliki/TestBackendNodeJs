import * as Sequelize from 'sequelize';

const dataBase: string = 'TestBackendDB';
const userName: string = 'UserInSQL';
const password: string = 'Password@123';
const settings: object = {
  host: "127.0.0.1",
  dialect: 'mssql',
  port: 1433,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  options: {encrypt: true},
};

export const sequelize = new Sequelize(dataBase, userName, password, settings);
