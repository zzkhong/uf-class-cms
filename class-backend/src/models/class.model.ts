import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../config/database';

interface ClassAttributes {
  id: number;
  name: string;
  level: string;
  teacherId: number;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> {}

export class ClassModel
  extends Model<ClassAttributes, ClassCreationAttributes>
  implements ClassAttributes
{
  public id!: number;
  public name!: string;
  public level!: string;
  public teacherId!: number;
}

ClassModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teachers',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'classes',
    timestamps: true,
  },
);
