import TreatmentController from '@/controllers/treatment';
import treatmentValidator from '@/middlewares/treatmentValidator';
import express from 'express';

const treatmentRouter = express.Router();

treatmentRouter.get('/', TreatmentController.getAll);
treatmentRouter.post('/', treatmentValidator, TreatmentController.create);

export default treatmentRouter;
