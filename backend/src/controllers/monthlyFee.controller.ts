import { RequestHandler } from "express";
import {MonthlyFeeService} from '../services/monthlyFee.services'
import { MonthlyFeeRepository } from "../repository/monthlyFee.repository";

const repository = new MonthlyFeeRepository()
const service = new MonthlyFeeService(repository)

export class MonthlyFeeController {
  get: RequestHandler = async (req, res, next) => {
    const {filter} = req.query
    const monthlyFees = await service.get(String(filter))
    res.status(200).json(monthlyFees)
  };
  getByEnrollment: RequestHandler = async (req, res, next) => {
    const {id} = req.params
    const monthlyFees = await service.get(`byEnrollment:${id}`)
    res.status(200).json(monthlyFees)
  }
  create: RequestHandler = async (req, res, next) => {

  };
  update: RequestHandler = async (req, res, next) => {
      const {id} = req.params
      const data = req.body
      const updatedMonthlyFee = await service.update(Number(id),data)
      res.status(200).json(updatedMonthlyFee)
  };
  delete: RequestHandler = async (req, res, next) => {};
}