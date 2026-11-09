import { Router } from "express";
import { MonthlyFeeController } from "../controllers/monthlyFee.controller";

const controller = new MonthlyFeeController()
const router = Router()
router.get('', (req, res, next) => controller.get(req, res, next));
router.get('/:id', (req, res, next) => controller.getById(req, res, next));
router.put('/:id/pay', (req, res, next) => controller.pay(req, res, next));
router.put('/:id/cancel', (req, res, next) => controller.cancel(req, res, next))
;
export default router 
