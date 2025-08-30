import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '@/database/config/database';

interface TeacherAttributes {
  id: number;
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}

interface TeacherCreationAttributes extends Optional<TeacherAttributes, 'id'> {}

export class Teacher
  extends Model<TeacherAttributes, TeacherCreationAttributes>
  implements TeacherAttributes
{
  public id!: number;
  public name!: string;
  public subject!: string;
  public email!: string;
  public contactNumber!: string;
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
