export interface ICreateTeacherRequest {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}

export interface IGetTeacherListResponse {
  data: ITeacher[];
}

export interface ITeacher {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}
