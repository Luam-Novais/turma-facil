import { Router } from 'express';
import { EnrollmentsController } from '../controllers/enrollments.controller';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { enrollmentSchema } from '../schemas/enrollment.schema';
const router = Router();
const controller = new EnrollmentsController();

router.get('', (req, res, next) => controller.get(req, res, next));
router.get('/:id', (req, res, next) => controller.get(req, res, next));
router.post(
  '',
  (req, res, next) => validateSchemaMiddleware(req, res, next, enrollmentSchema),
  (req, res, next) => controller.create(req, res, next),
);
router.put(
  '/:id',
  (req, res, next) => validateSchemaMiddleware(req, res, next, enrollmentSchema.partial()),
  (req, res, next) => controller.update(req, res, next),
);
router.delete('/:id', (req, res, next) => controller.delete(req, res, next));
export default router;
