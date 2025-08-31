import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelize } from '@/database/config/database';

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
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'teachers',
    timestamps: true,
    indexes: [{ unique: true, fields: ['email'] }],
  },
);

export default Teacher;
