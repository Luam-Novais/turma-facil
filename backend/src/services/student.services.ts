import { HttpError } from '../middlewares/http.middleware';
import StudentRepository from '../repository/student.repository';
import { type StudentDTO } from '../types/student';
import { formatBirthDate } from '../utils/dates';
import { cleanString } from '../utils/string';

interface GetQuerys {
  modality_id?: string;
  filters?: string;
}

export default class StudentService {
  constructor(private repository: StudentRepository) {}
  get = async (query: GetQuerys) => {
    return await this.repository.get();
  };
  create = async (student: StudentDTO) => {
    try {
      if (student.contact_number.length < 11) throw new HttpError(400, 'Falha ao criar aluno, numero de telefone inválido.');
      if (student.name.length <= 3 || (student.name_responsible && student.name_responsible.length <= 3)) {
        throw new HttpError(400, 'Dados inválidos. Por favor verifique o nome e telefone.');
      }

      const formated: StudentDTO = {
        ...student,
        date_birth: formatBirthDate(student.date_birth as string),
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
      const deleted = await this.repository.delete(student_id, );
      return deleted;
    } catch (error: any) {
      if (error.code === `P2025`) {
        throw new HttpError(404, 'Aluno não encontrado.');
      }
      throw error;
    }
  };
}
