import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Customer } from '../../types/Customer';

export type CustomerInputtableFields = Optional<Customer, 'id'>;

type CustomerSequelizeModelCreator = ModelDefined<Customer, CustomerInputtableFields>;

export type CustomerSequelizeModel = Model<Customer, CustomerInputtableFields>


const CustomerModel: CustomerSequelizeModelCreator = db.define('Customer', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    customer_code: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },
}, {
  tableName: 'customers',
  timestamps: false,
  underscored: false,
});


export default CustomerModel;