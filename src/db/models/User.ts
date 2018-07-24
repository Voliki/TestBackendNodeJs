import { sequelize } from '../sequelize';
import * as Sequelize from 'sequelize';
import { validate } from '../../../node_modules/@types/joi';

export interface UserModel extends Sequelize.Model<UserModel, any> {
  user_name: string;
  user_second_name: string;
  user_age: number;
  user_address: string;
  user_phone: string;
}

export interface SpecialtyModel extends Sequelize.Model<SpecialtyModel, any> {
  specialty: string;
}

/* MODEL*/
export const User = sequelize.define<UserModel, any>('First_Table', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  user_name: {
    type: Sequelize.STRING,
    validate: {notNull: true }
  },
  user_second_name: { 
    type: Sequelize.STRING, 
    validate: {notNull: false }
  },
  user_age: {
    type: Sequelize.INTEGER,
    validate: { min: 18, max: 100 }
  },
  user_address: {
    type: Sequelize.STRING,
    validate: { notNull: true }
  },
  user_phone: { 
    type: Sequelize.STRING,
    validate: { notNull: true }
  },
  specialty_list_Id: { 
    type: Sequelize.INTEGER,
    validate: { notNull: true }
  },
}, {
    tableName: 'First_Table',
    timestamps: false,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: 'specialty_list_Id',
        fields: ['specialty_list']
      }
    ],
    validate: {
      testValidate() {
        // if(this.user_name === '' || this.user_second_name === '' || 
        // this.user_address === '' || this.user_phone === ''){
        //   throw new Error('Name Null');
        // }
      }
    }
  });

/***** */

/* MODEL 2*/
export const Specialty = sequelize.define<SpecialtyModel, any>('specialty_list', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  specialty: Sequelize.STRING,
}, {
    tableName: 'Specialty_list',
    timestamps: false,
    paranoid: true,
    underscored: true,
  });
/***** */
// One-To-One associations
User.belongsTo(Specialty);

const userInclude = [
  {
    model: Specialty,
    required: false,
  }
];
//**************************** */

/** service model*/
export class UserService {
  userAttributes(): Array<any> {
    return ['id', 'user_name', 'user_second_name', 'user_age', 'user_address', 'user_phone', 'specialty_list_Id'];
  }

  getUsers(): any {
    return User.findAll({
      include: [...userInclude],
    })
      .then(users => {
        return users;
      })
      .catch(err => {
        console.log(err);
        return err.message;
      });
  }

  getSpecialtyUser(): any {
    return Specialty.findAll()
      .then(specialty => {
        return specialty;
      })
      .catch(err => {
        console.log(err);
        return err.message;
      });
  }

  setNewUser(user: any): any {
    return User.create(user,
      { 
        fields: [...this.userAttributes() ], 
        include: [...userInclude],
      })
      .then(() => {
        return this.getUsers();
      })
      .catch(err => {
        console.log(err)
        return err.message;
      });
  }

}
/*** */
