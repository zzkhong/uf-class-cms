import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '@/database/config/database';

import { Teacher } from './teacher.model';

interface ClassAttributes {
  id: number;
  name: string;
  level: string;
  teacherId: number;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> {}

export class Class
  extends Model<ClassAttributes, ClassCreationAttributes>
  implements ClassAttributes
{
  public id!: number;
  public name!: string;
  public level!: string;
  public teacherId!: number;
}

Class.init(
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

Class.belongsTo(Teacher, {
  as: 'teacher',
  foreignKey: {
    name: 'teacherId',
    allowNull: false,
  },
  foreignKeyConstraint: true,
});

export default Class;
