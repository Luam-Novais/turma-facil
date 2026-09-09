import { type RequestHandler } from 'express';
import StudentService from '../services/student.services';
import StudentRepository from '../repository/student.repository';
import { HttpError } from '../middlewares/http.middleware';
import { StudentDTO } from '../types/student';

const repository = new StudentRepository();
const service = new StudentService(repository);
export default class StudentController {
  get: RequestHandler = async (req, res, next) => {
    try {
      const query = req.query;
      const students = await service.get(query);
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  };
  create: RequestHandler = async (req, res, next) => {
    try {
      const student = req.body as StudentDTO;
      if (!student) throw new HttpError(400, 'Dados do aluno não enviados.');
      if (!student.name || !student.contact_number || !student.date_birth) throw new HttpError(400, 'Dados do aluno incompletos.');
      const created = await service.create(student);
      if (created) {
        res.status(201).json({ message: `Aluno criado com sucesso.` });
      }
    } catch (error) {
      next(error);
    }
  };
  update: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body as Partial<StudentDTO>;

      if (!id) throw new HttpError(400, 'Identificador de aluno não enviado.');
      await service.update(+id, data);
      res.status(200).json({ message: 'Aluno editado com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
  delete: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) throw new HttpError(400, 'Identificador de aluno não enviado.');
      await service.delete(+id);
      res.status(200).json({ message: 'Aluno excluído com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
}
