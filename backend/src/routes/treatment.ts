import express from 'express';
import TreatmentController from '../controllers/treatment';

const treatmentRouter = express.Router();

treatmentRouter.get('/', TreatmentController.getAll);
treatmentRouter.post('/', TreatmentController.create);

export default treatmentRouter;
