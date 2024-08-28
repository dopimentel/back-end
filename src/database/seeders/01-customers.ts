import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('customers', [
      {
        customer_code: 'CUST001',
      },
      {
        customer_code: 'CUST002',
      },
      {
        customer_code: 'CUST003',
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('customers', {});
  }
};
