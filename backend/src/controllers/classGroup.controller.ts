import { type RequestHandler } from 'express';
import ClassService from '../services/classGroup.services';
import ClassGroupRepository from '../repository/classGroup.repository';
import { HttpError } from '../middlewares/http.middleware';
import { type ClassGroupDTO } from '../types/classGroup';


const repository = new ClassGroupRepository();
const service = new ClassService(repository);
export default class classGroupController {
  get: RequestHandler = async (req, res, next) => {
    try {
      const classGroup = await service.get();
      res.status(200).json(classGroup);
    } catch (error) {
      next(error);
    }
  };
  create: RequestHandler = async (req, res, next) => {
    try {
      const classGroup = req.body as ClassGroupDTO;
      if (!classGroup) throw new HttpError(400, 'Dados da turma não enviados.');
      if (!classGroup.name) throw new HttpError(400, 'Dados da turma incompletos.');
      const created = await service.create(classGroup);
      if (created) {
        res.status(201).json({ message: `Turma criada com sucesso.` });
      }
    } catch (error) {
      next(error);
    }
  };
  update: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body as Partial<ClassGroupDTO>;

      if (!id) throw new HttpError(400, 'Identificador de turma não enviado.');
      await service.update(+id, data);
      res.status(200).json({ message: 'Turma editada com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
  delete: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) throw new HttpError(400, 'Identificador de turma não enviado.');
      await service.delete(+id);
      res.status(200).json({ message: 'Turma excluída com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
}
