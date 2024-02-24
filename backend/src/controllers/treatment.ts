import { Request, Response } from 'express';
import TreatmentModel from '../models/treatment';

export default class TreatmentController {
  static async getAll(_: Request, res: Response) {
    try {
      // Get the list of treatment from the database
      const treatments = await TreatmentModel.find();
      res.json({
        status: 'success',
        data: treatments,
      });
    } catch (errors) {
      res.status(500).send({
        status: 'error',
        data: {
          errors,
        },
      });
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const id = req?.body?.id;
      const name = req?.body?.name;
      const treatment_date = new Date(`${req?.body?.date} ${req?.body?.time}`);
      const treatment_description = req?.body?.treatment_description;
      const medications_prescribed = req?.body?.medications_prescribed;
      const cost = req?.body?.cost;

      // Create a new treatment in the database
      const treatment = new TreatmentModel(
        id,
        name,
        treatment_date,
        treatment_description,
        medications_prescribed,
        cost,
      );

      const documentId = await treatment.save();

      res.status(201).send({
        status: 'success',
        data: {
          documentId,
        },
      });
    } catch (errors) {
      res.status(500).send({
        status: 'error',
        data: {
          errors,
        },
      });
    }
  }
}
