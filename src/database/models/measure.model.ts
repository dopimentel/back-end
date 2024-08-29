import { DataTypes, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Measure } from '../../types/Measure';
import { v4 as uuidv4 } from 'uuid';


export type MeasureInputtableFields = Optional<Measure, 'id'>;

type MeasureSequelizeModelCreator = ModelDefined<Measure, MeasureInputtableFields>;


const MeasureModel: MeasureSequelizeModelCreator = db.define('Measure', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    measure_uuid: {
        allowNull: false,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
    },
    measure_datetime: {
        allowNull: false,
        type: DataTypes.DATE,
        // defaultValue: new Date(),
    },
    measure_type: {
        allowNull: false,
        type: DataTypes.ENUM('WATER', 'GAS'),
    },
    has_confirmed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        // defaultValue: false,
    },
    image_url: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    customer_code: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'customers',
          key: 'customer_code',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    measure_value: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
    }
}, {
  tableName: 'measures',
  timestamps: false,
  underscored: false,
});

export default MeasureModel;