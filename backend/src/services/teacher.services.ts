import { HttpError } from '../middlewares/http.middleware';
import teacherRepository from '../repository/teacher.repository';
import { type TeacherDTO } from '../types/teacher';



export default class teacherService {
  constructor(private repository: teacherRepository) {}
  get = async () => {
    return await this.repository.get();
  };
  create = async (teacher: TeacherDTO) => {
    try {
      if (teacher.name.length < 3 || teacher.contact_number.length > 11) {
        throw new HttpError(400, 'Dados inválidos. Por favor verifique o nome e telefone.');
      }

      const created = await this.repository.create(teacher);
      return created;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };
  update = async (teacher_id: number, data: Partial<TeacherDTO>) => {
    try {
      const updated = await this.repository.update(teacher_id, data);
      return updated;
    } catch (error: any) {
      if (error.code === `P2025`) {
        throw new HttpError(404, 'professor não encontrado.');
      }
      throw error;
    }
  };
  delete = async (teacher_id: number) => {
    try {
      const deleted = await this.repository.delete(teacher_id);
      return deleted;
    } catch (error: any) {
      if (error.code === `P2025`) {
        throw new HttpError(404, 'professor não encontrado.');
      }
      throw error;
    }
  };
}
