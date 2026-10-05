import { HttpError } from '../middlewares/http.middleware';
import { EnrollmentsRepository } from '../repository/enrollments.repository';
import { CreateEnrollmentDTO, EnrollmentAndSudentDTO, EnrollmentDTO, StatusEnrollment } from '../types/enrollments';
import { MonthlyFeeDTO } from '../types/monthlyFee';
import { formatDate } from '../utils/dates';
import { phoneRegex, validateRegex } from '../utils/regex';
import { MonthlyFeeService } from './monthlyFee.services';


export class EnrollmentsService {
  constructor(private repository: EnrollmentsRepository,  private monthlyFeeService: MonthlyFeeService) {}
  get = async (filter?: string) => {
    switch (filter) {
      default: {
        return await this.repository.get();
      }

      case 'active': {
        return await this.repository.getEnrollmentsByStatus('ACTIVE');
      }
      case 'inactive': {
        return await this.repository.getEnrollmentsByStatus('INACTIVE');
      }
      case 'canceled': {
        return await this.repository.getEnrollmentsByStatus('CANCELED');
      }
    }
  };
  getAllStudentEnrollments = async (id: string | undefined) => {
    try {
      if (!id) throw new HttpError(400, 'Identificador de aluno não enviado.');
      const studentsAndEnrollments = await this.repository.getAllStudentEnrollments(Number(id));
      return studentsAndEnrollments;
    } catch (error: any) {
      if (error.code === '') {
      }
      throw error;
    }
  };
  getAllEnrollmentsClass = async (id: string | undefined) => {
    try {
      if (!id) throw new HttpError(400, 'Identificador de aluno não enviado.');
      const enrollments = await this.repository.getAllEnrollmentsClass(Number(id));
      return enrollments;
    } catch (error: any) {
      throw error;
    }
  };
  create = async ( data: CreateEnrollmentDTO) => {
    if ('student_id' in data) {
      return await this.createEnrollmentsForExistingStudent(data);
    }
    return await this.createStudentAndEnrollments(data);
  };
  update = async (id: number, data: Partial<EnrollmentDTO>) => {
    try {
      if ('status' in data) {
        if (data.status === undefined) throw new HttpError(400, `Status para atualização não enviado.`);
        const formatedStatus = data.status.trim().toUpperCase();
        if (!availableStatus.includes(formatedStatus)) if (formatedStatus) throw new HttpError(400, `Status para atualização inválido.`);
        return await this.repository.updateStatusEnrollment(id, formatedStatus as StatusEnrollment);
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
        status: 'ACTIVE',
        start_date: formatDate(data.start_date as string),
        student_data: {
          ...data.student_data,
          date_birth: formatDate(data.student_data.date_birth as string),
        },
      };
      return await this.repository.createStudentAndEnrollments(formated, this.monthlyFeeService);
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
        status: 'ACTIVE',
      };

      return await this.repository.createEnrollmentsForExistingStudent(formated,this.monthlyFeeService);
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
const availableStatus = ['ACTIVE', 'CANCELED', 'INACTIVE'];
