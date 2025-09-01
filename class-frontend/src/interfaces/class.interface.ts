export interface ICreateClassRequest {
  level: string;
  name: string;
  teacherEmail: string;
}

export interface IGetClassListResponse {
  data: IClass[];
}

export interface IClass {
  level: string;
  name: string;
  formTeacher: {
    name: string;
  };
}
