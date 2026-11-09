import { Router } from 'express';
import TeacherController from '../controllers/teacher.controller';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { teacherSchema, updateTeacherSchema } from '../schemas/teacher.schema';

const controller = new TeacherController();
const router = Router();
router.get('', (req, res, next) => controller.get(req, res, next));
router.post(
  '',
  (req, res, next) => validateSchemaMiddleware(req, res, next, teacherSchema),
  (req, res, next) => controller.create(req, res, next),
);
router.put(
  '/:id',
  (req, res, next) => validateSchemaMiddleware(req, res, next, updateTeacherSchema),
  (req, res, next) => controller.update(req, res, next),
);
router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

export default router;
