import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('measures', [
      {
        measure_uuid: uuidv4(),
        measure_type: 'WATER',
        has_confirmed: true,
        image_url: 'http://example.com/image1.jpg',
        customer_code: 'CUST001',
        measure_value: 123.45,
      },
      {
        measure_uuid: uuidv4(),
        measure_type: 'GAS',
        has_confirmed: false,
        image_url: 'http://example.com/image1.jpg',
        customer_code: 'CUST001',
        measure_value: 123,
      },
      {
        measure_uuid: 'b2c3d4e5-f6g7-8901-hi23-jk45lm67no89',
        measure_type: 'GAS',
        has_confirmed: false,
        image_url: 'http://example.com/image2.jpg',
        customer_code: 'CUST002',
        measure_value: 678.90,
      },
      {
        measure_uuid: 'c3d4e5f6-g7h8-9012-ij34-kl56mn78op90',
        measure_type: 'WATER',
        has_confirmed: true,
        image_url: 'http://example.com/image3.jpg',
        customer_code: 'CUST003',
        measure_value: 234.56,
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('measures', {});
  }
};