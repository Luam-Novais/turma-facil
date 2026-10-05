import { Router } from "express";
import { MonthlyFeeController } from "../controllers/monthlyFee.controller";

const controller = new MonthlyFeeController()
const router = Router()
router.get('', (req, res, next) => controller.get(req, res, next));
router.get('/:id', (req, res, next) => controller.getByEnrollment(req, res, next));
router.put('/:id', (req, res, next) => controller.update(req, res, next));
export default router 
