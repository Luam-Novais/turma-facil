import { RequestHandler } from 'express';
import { MonthlyFeeService } from '../services/monthlyFee.services';
import { MonthlyFeeRepository } from '../repository/monthlyFee.repository';
import { EnrollmentsRepository } from '../repository/enrollments.repository';
import { HttpError } from '../middlewares/http.middleware';

const repository = new MonthlyFeeRepository();
const enrollmentRepository = new EnrollmentsRepository();
const service = new MonthlyFeeService(repository, enrollmentRepository);

export class MonthlyFeeController {
  get: RequestHandler = async (req, res, next) => {
    try {
      const { filter } = req.query;
      const monthlyFees = await service.get(String(filter));
      res.status(200).json(monthlyFees);
    } catch (error) {
      next(error);
    }
  };
  getById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) throw new HttpError(400, `Identificador inválido.`);
      const monthlyFees = await service.getById(Number(id));
      res.status(200).json(monthlyFees);
    } catch (error) {
      next(error);
    }
  };
  create: RequestHandler = async (req, res, next) => {};
  pay: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) throw new HttpError(400, 'Identificador inválido.');
      const updated = await service.pay(Number(id));
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };
  cancel: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) throw new HttpError(400, 'Identificador inválido.');
      const updated = await service.cancel(Number(id));
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };
  overdue: RequestHandler = async (req, res, next) => {
    try {
    } catch (error) {}
  };
  delete: RequestHandler = async (req, res, next) => {};
}
