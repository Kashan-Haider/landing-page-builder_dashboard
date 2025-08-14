import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { handleServiceError } from './errorHandler';

/**
 * Middleware to validate request body using Zod schema
 */
export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate and parse the request body
      const validatedData = schema.parse(req.body);
      
      // Replace req.body with validated/parsed data (includes defaults, transformations)
      req.body = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Create a more readable error message from Zod validation errors
        const errorMessages = error.issues.map((err: any) => {
          const path = err.path.join('.');
          return `${path}: ${err.message}`;
        });
        
        const validationError = new Error(`Validation failed: ${errorMessages.join(', ')}`);
        return handleServiceError(validationError, res, 'Invalid request data');
      }
      
      // Handle unexpected errors
      return handleServiceError(error, res, 'Validation error');
    }
  };
}

/**
 * Middleware to validate request parameters using Zod schema
 */
export function validateParams<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedParams = schema.parse(req.params);
      req.params = validatedParams as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err: any) => {
          const path = err.path.join('.');
          return `${path}: ${err.message}`;
        });
        
        const validationError = new Error(`Invalid parameters: ${errorMessages.join(', ')}`);
        return handleServiceError(validationError, res, 'Invalid request parameters');
      }
      
      return handleServiceError(error, res, 'Parameter validation error');
    }
  };
}

/**
 * Middleware to validate request query parameters using Zod schema
 */
export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedQuery = schema.parse(req.query);
      req.query = validatedQuery as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err: any) => {
          const path = err.path.join('.');
          return `${path}: ${err.message}`;
        });
        
        const validationError = new Error(`Invalid query parameters: ${errorMessages.join(', ')}`);
        return handleServiceError(validationError, res, 'Invalid query parameters');
      }
      
      return handleServiceError(error, res, 'Query validation error');
    }
  };
}
