import { RequestHandler } from 'express';
import { MonthlyFeeService } from '../services/monthlyFee.services';
import { MonthlyFeeRepository } from '../repository/monthlyFee.repository';
import { HttpError } from '../middlewares/http.middleware';

const repository = new MonthlyFeeRepository();
const service = new MonthlyFeeService(repository);

export class MonthlyFeeController {
  get: RequestHandler = async (req, res, next) => {
   try {
     const { filter } = req.query;
     const monthlyFees = await service.get(String(filter));
     res.status(200).json(monthlyFees);
   } catch (error) {
    next(error)
   }
  };
  getById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isNaN(Number(id))) throw new HttpError(400, `Identificador inválido.`);
      const monthlyFees = await service.getById(Number(id));
      res.status(200).json(monthlyFees);
    } catch (error) {
      next(error);
    }
  };
  create: RequestHandler = async (req, res, next) => {};
  update: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedMonthlyFee = await service.update(Number(id), data);
      res.status(200).json(updatedMonthlyFee);
    } catch (error) {
      next(error);
    }
  };
  delete: RequestHandler = async (req, res, next) => {};
}
