import { HttpError } from '../middlewares/http.middleware';
import StudentRepository from '../repository/student.repository';
import { type StudentDTO } from '../types/student';
import { formatDate } from '../utils/dates';
import { phoneRegex, validateRegex } from '../utils/regex';
import { cleanString } from '../utils/string';

export default class StudentService {
  constructor(private repository: StudentRepository) {}
  get = async (filter: string) => {
    switch (cleanString(filter)) {
      default: {
        return await this.repository.get();
      }
      case 'childrens': {
        return await this.repository.getChildrenStudent();
      }
    }
  };
  getStudent = async (id: string, filter?: string) => {
    try {
      if (filter) {
        switch (cleanString(filter)) {
          case 'enrollments': {
            return await this.repository.getStudentAndEnrollments(Number(id));
          }
          case 'payments': {
            return await this.repository.getStudentAndPayments(Number(id));
          }
        }
      }
      const student = await this.repository.findById(Number(id));
      return student;
    } catch (error: any) {
      if (error.code === `P2025`) {
        throw new HttpError(404, 'Aluno não encontrado.');
      }
      throw error;
    }
  };
  create = async (student: StudentDTO) => {
    try {
      if (!validateRegex(phoneRegex, student.contact_number)) throw new HttpError(400, 'Falha ao criar aluno, numero de telefone inválido.');
      if (student.name.length <= 3 || (student.name_responsible && student.name_responsible.length <= 3)) {
        throw new HttpError(400, 'Dados inválidos. Por favor verifique o nome e telefone.');
      }
      const formated: StudentDTO = {
        ...student,
      };
      const created = await this.repository.create(formated);
      return created;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };
  update = async (student_id: number, data: Partial<StudentDTO>) => {
    try {
      const updated = await this.repository.update(student_id, data);
      return updated;
    } catch (error: any) {
      if (error.code === `P2025`) {
        throw new HttpError(404, 'Aluno não encontrado.');
      }
      throw error;
    }
  };
  delete = async (student_id: number) => {
    try {
      const deleted = await this.repository.delete(student_id);
      return deleted;
    } catch (error: any) {
      if (error.code === `P2025`) {
        throw new HttpError(404, 'Aluno não encontrado.');
      }
      throw error;
    }
  };
}
