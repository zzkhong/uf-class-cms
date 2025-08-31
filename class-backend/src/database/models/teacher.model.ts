import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelize } from '@/database/config/database';

import { Class } from './class.model';

export class Teacher extends Model<
  InferAttributes<Teacher>,
  InferCreationAttributes<Teacher>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare subject: string;
  declare email: string;
  declare contactNumber: string;
}

Teacher.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(64),
    },
    subject: {
      allowNull: false,
      type: DataTypes.STRING(128),
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(64),
    },
    contactNumber: {
      allowNull: false,
      type: DataTypes.STRING(32),
    },
  },
  {
    sequelize,
    tableName: 'teachers',
    timestamps: true,
    indexes: [{ unique: true, fields: ['email'] }],
  },
);
