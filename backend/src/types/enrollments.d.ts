import { StudentDTO } from './student';
export interface EnrollmentAndSudentDTO {
  student_data: StudentDTO;
  start_date: string | Date;
  status: boolean;
  class_id: number;
}
export interface EnrollmentDTO {
  start_date: string | Date;
  status: boolean;
  student_id: number;
  class_id: number;
}


export type CreateEnrollmentDTO = EnrollmentDTO | EnrollmentAndSudentDTO;
