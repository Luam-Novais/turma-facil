import { StudentDTO } from './student';
export interface EnrollmentAndSudentDTO {
  student_data: StudentDTO;
  start_date: string | Date;
  status: StatusEnrollment;
  class_id: number;
}
export interface EnrollmentDTO {
  start_date: string | Date;
  status: StatusEnrollment;
  student_id: number;
  class_id: number;
}

export type StatusEnrollment = 'ACTIVE' | 'INACTIVE' | 'CANCELED';

export type CreateEnrollmentDTO = EnrollmentDTO | EnrollmentAndSudentDTO;
