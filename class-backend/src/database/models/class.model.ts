import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelize } from '@/database/config/database';

import { Teacher } from './teacher.model';

export class Class extends Model<
  InferAttributes<Class>,
  InferCreationAttributes<Class>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare level: string;
  declare teacherId: ForeignKey<Teacher['id']>;
}

Class.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(128),
    },
    level: {
      allowNull: false,
      type: DataTypes.STRING(64),
    },
    teacherId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'teachers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  },
  {
    sequelize,
    tableName: 'classes',
    timestamps: true,
  },
);
