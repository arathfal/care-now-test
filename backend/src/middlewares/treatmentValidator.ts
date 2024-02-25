import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

// Define validation middleware functions
const treatmentValidator = [
  body('id')
    .notEmpty()
    .withMessage('ID cannot be empty')
    .isNumeric()
    .withMessage('ID must be a number'),
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('date').custom((value) => {
    if (!value) {
      throw new Error('Date is empty');
    }
    if (!new Date(value).getTime()) {
      throw new Error('Invalid treatment date format');
    }
    return true;
  }),
  body('time').custom((value, { req }) => {
    if (!value) {
      throw new Error('Time is empty');
    }

    const { date } = req.body;
    const datetime = `${date} ${value}`;
    if (!new Date(datetime).getTime()) {
      throw new Error('Invalid treatment time format');
    }
    return true;
  }),
  body('treatment_description')
    .notEmpty()
    .withMessage('Treatment description cannot be empty')
    .isArray()
    .withMessage('Treatment description must be an array'),
  body('medications_prescribed')
    .notEmpty()
    .withMessage('Medications prescribed cannot be empty')
    .isArray()
    .withMessage('Medications prescribed must be an array'),
  body('cost')
    .notEmpty()
    .withMessage('Cost cannot be empty')
    .isNumeric()
    .withMessage('Cost must be a number'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const err = errors.array().map((error) => {
      const path = error?.['path' as keyof typeof error];
      const message = error?.msg;
      return {
        path,
        message,
      };
    });

    if (!errors.isEmpty()) {
      return res.status(422).send({
        success: false,
        data: null,
        errors: err,
      });
    }
    next();
  },
];

export default treatmentValidator;
