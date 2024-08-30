import { Model, QueryInterface, DataTypes } from 'sequelize'; 

import { Customer } from '../../types/Customer';

export default { 
  up(queryInterface: QueryInterface) { 
    return queryInterface.createTable<Model<Customer>>('customers', { 
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
      }
    }) 
  }, 
  
  down(queryInterface: QueryInterface) { 
    return queryInterface.dropTable('customers') 
  } 
};