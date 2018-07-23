import { sequelize } from '../sequelize';
import * as Sequelize from 'sequelize';

export interface UserModel extends Sequelize.Model<UserModel, any> {
  user_name: string;
  user_second_name: string;
  user_age: number;
  user_address: string;
  user_phone: string;
}

/* MODEL*/
export const User = sequelize.define<UserModel, any>('First_Table', {
  user_name: Sequelize.STRING,
  user_second_name: Sequelize.STRING,
  user_age: Sequelize.INTEGER,
  user_address: Sequelize.STRING,
  user_phone: Sequelize.STRING,
}, {
    tableName: 'First_Table',
    timestamps: false,
    paranoid: true,
  });

/***** */

/** service model*/
export class UserService {
  userAttributes(): Array<any> {
    return ['user_name', 'user_second_name', 'user_age', 'user_address', 'user_phone'];
  }

  getUsers(): any {
    return User.findAll({
      attributes: [...this.userAttributes()],
    })
      .then(users => {
        return users;
      })
      .catch(err => {
        console.log(err)
      })
  }

}
/*** */
