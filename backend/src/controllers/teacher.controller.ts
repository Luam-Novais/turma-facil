import { type RequestHandler } from 'express';
import TeacherService from '../services/teacher.services';
import TeacherRepository from '../repository/teacher.repository';
import { HttpError } from '../middlewares/http.middleware';
import { TeacherDTO } from '../types/teacher';

const repository = new TeacherRepository();
const service = new TeacherService(repository);
export default class teacherController {
  get: RequestHandler = async (req, res, next) => {
    try {
      // const query = req.query;
      const teachers = await service.get();
      res.status(200).json(teachers);
    } catch (error) {
      next(error);
    }
  };
  create: RequestHandler = async (req, res, next) => {
    try {
      const teacher = req.body as TeacherDTO;
      console.log(teacher)
      if (!teacher) throw new HttpError(400, 'Dados do Professor não enviados.');
      if (!teacher.name || !teacher.contact_number ) throw new HttpError(400, 'Dados do Professor incompletos.');
      const created = await service.create(teacher);
      if (created) {
        res.status(201).json({ message: `Professor criado com sucesso.` });
      }
    } catch (error) {
      next(error);
    }
  };
  update: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body as Partial<TeacherDTO>;

      if (!id) throw new HttpError(400, 'Identificador de Professor não enviado.');
      await service.update(+id, data);
      res.status(200).json({ message: 'Professor editado com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
  delete: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) throw new HttpError(400, 'Identificador de Professor não enviado.');
      await service.delete(+id);
      res.status(200).json({ message: 'Professor excluído com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
}
