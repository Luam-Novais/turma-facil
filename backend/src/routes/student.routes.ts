import { Router } from 'express';
import StudentController from '../controllers/student.constroller';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { studentSchema } from '../schemas/student.schema';

const controller = new StudentController();
const router = Router();
//get
router.get('', (req, res, next) => controller.get(req, res, next));
router.get('/:id', (req, res, next) => controller.getStudent(req, res, next));
//post
router.post(
  '',
  (req, res, next) => validateSchemaMiddleware(req, res, next, studentSchema),
  (req, res, next) => controller.create(req, res, next),
);
router.put('/:id', (req, res, next) => controller.update(req, res, next));
router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

export default router;
