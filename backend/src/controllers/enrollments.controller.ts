import { RequestHandler } from 'express';
import { EnrollmentsService } from '../services/enrollments.services';
import { EnrollmentsRepository } from '../repository/enrollments.repository';
import { HttpError } from '../middlewares/http.middleware';

const repository = new EnrollmentsRepository();
const service = new EnrollmentsService(repository);

export class EnrollmentsController {
  get: RequestHandler = async(req, res, next) =>{
    try {
      const {filter} =req.query
      const enrollments = await service.get(filter as string)

      res.status(200).json(enrollments)
    } catch (error) {
      next(error)
    }
  }
  getAllStudentEnrollments: RequestHandler  = async (req, res, next) =>{
  try {
      const { id } = req.params;
      const studentsAndEnrollments = await service.getAllStudentEnrollments(id as string);
      res.status(200).json(studentsAndEnrollments)
  } catch (error) {
    next(error)
  }
  }
  getAllEnrollmentsClass: RequestHandler = async(req, res, next)=>{
    try {
       try {
         const { id } = req.params;
         const enrollments = await service.getAllEnrollmentsClass(id as string);
         res.status(200).json(enrollments);
       } catch (error) {
         next(error);
       }
    } catch (error) {
      
    }
  }
  create: RequestHandler = async (req, res, next) => {
    try {
      const data = req.body;
      await service.create(data);
      res.status(201).json({ message: 'Matricula criada com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
  update: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      if (!id) throw new HttpError(400, 'Identificador não enviado.');

      const enrollment = await service.update(Number(id), data);
      if (!enrollment?.status) res.status(200).json({ message: 'Matrícula desativada.' });
      res.status(200).json({ message: 'Matrícula ativada.' });
    } catch (error) {
      next(error);
    }
  };
  delete: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(Number(id));
      res.status(200).json({ message: 'Matrícula excluída com sucesso.' });
    } catch (error) {
      next(error);
    }
  };
}
