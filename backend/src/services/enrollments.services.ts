import { HttpError } from '../middlewares/http.middleware';
import { EnrollmentsRepository } from '../repository/enrollments.repository';
import { CreateEnrollmentDTO, EnrollmentAndSudentDTO, EnrollmentDTO } from '../types/enrollments';
import { formatDate } from '../utils/dates';
import { phoneRegex, validateRegex } from '../utils/regex';

export class EnrollmentsService {
  constructor(private repository: EnrollmentsRepository) {}

  get = async (filter?: string) => {
    switch (filter) {
      default: {
        return await this.repository.get();
      }
      case 'active': {
        return await this.repository.getEnrollmentsActive(true);
      }
      case 'desactive': {
        return await this.repository.getEnrollmentsActive(true);
      }
    }
  };
  create = async (data: CreateEnrollmentDTO) => {
    if ('student_id' in data) {
      return await this.createEnrollmentsForExistingStudent(data);
    }
    return await this.createStudentAndEnrollments(data);
  };
  update = async (id: number, data: Partial<EnrollmentDTO>) => {
    try {
      if ('status' in data) {
        if (data.status === undefined) throw new HttpError(400, `Status para atualização não enviado.`);
        return await this.repository.updateStatusEnrollment(id, data.status);
      }
    } catch (error: any) {
      if (error.code === 'P2025') {
        const { modelName } = error.meta;
        if (modelName === `Enrollment`) throw new HttpError(404, 'Matrícula não encontrada.');
      }
      throw error;
    }
  };
  delete = async (id: number) => {
    try {
      if (id === undefined) throw new HttpError(400, 'O id não foi enviado.');
      await this.repository.delete(id);
    } catch (error: any) {
      if (error.code === 'P2025') {
        const { modelName } = error.meta;
        if (modelName === `Enrollment`) throw new HttpError(404, 'Matrícula não encontrada.');
      }
      throw error;
    }
  };
  private createStudentAndEnrollments = async (data: EnrollmentAndSudentDTO) => {
    try {
      if (!validateRegex(phoneRegex, data.student_data.contact_number)) {
        throw new HttpError(400, 'Formato de telefone inválido.');
      }
      const formated: EnrollmentAndSudentDTO = {
        ...data,
        class_id: Number(data.class_id),
        status: true,
        start_date: formatDate(data.start_date as string),
        student_data: {
          ...data.student_data,
          date_birth: formatDate(data.student_data.date_birth as string),
        },
      };
      return await this.repository.createStudentAndEnrollments(formated);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new HttpError(400, 'Falha ao criar matricula, matricula ja existente.');
      }
      if (error.code === 'P2003') {
        throw new HttpError(400, 'O identificador da turma não existe.');
      }
      throw new HttpError(400, error.message);
    }
  };
  private createEnrollmentsForExistingStudent = async (data: EnrollmentDTO) => {
    try {
      if (!data.student_id) throw new HttpError(400, 'Falha ao criar matrícula, identificador do aluno nâo enviado.');
      if (!data.class_id) throw new HttpError(400, 'Falha ao criar matrícula, identificador da turma nâo enviado.');

      const formated: EnrollmentDTO = {
        class_id: Number(data.class_id),
        student_id: Number(data.student_id),
        start_date: formatDate(data.start_date as string),
        status: true,
      };

      return await this.repository.createEnrollmentsForExistingStudent(formated);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new HttpError(400, 'Falha ao criar matricula, matricula ja existente.');
      }
      if (error.code === 'P2025') {
        const { modelName } = error.meta;
        if (modelName === `Student`) throw new HttpError(404, 'Aluno não encontrado.');
        if (modelName === `ClassGroup`) throw new HttpError(404, 'Turma não encontrada.');
      }
      throw new HttpError(500, error.message);
    }
  };
}
