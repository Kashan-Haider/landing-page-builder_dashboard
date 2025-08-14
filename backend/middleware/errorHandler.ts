import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

/**
 * Async route wrapper that catches errors and forwards them to error handler
 */
export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Creates a standardized API response
 */
export function createApiResponse<T>(success: boolean, data?: T, message?: string, error?: string): ApiResponse<T> {
  return {
    success,
    ...(data && { data }),
    ...(message && { message }),
    ...(error && { error })
  };
}

/**
 * Sends a success response with data
 */
export function sendSuccess(res: Response, data: any, message?: string, statusCode = 200) {
  res.status(statusCode).json(createApiResponse(true, data, message));
}

/**
 * Sends an error response
 */
export function sendError(res: Response, error: string, statusCode = 500, message?: string) {
  const errorMessage = message || error;
  res.status(statusCode).json(createApiResponse(false, undefined, errorMessage, error));
}

/**
 * Determines appropriate status code based on error message
 */
export function getStatusCodeFromError(error: Error): number {
  const message = error.message.toLowerCase();
  
  if (message.includes('not found')) return 404;
  if (message.includes('required') || message.includes('missing') || message.includes('invalid')) return 400;
  if (message.includes('unauthorized')) return 401;
  if (message.includes('forbidden')) return 403;
  
  return 500;
}

/**
 * Enhanced error handler that automatically determines status codes and formats responses
 */
export function handleServiceError(error: any, res: Response, defaultMessage = 'Operation failed') {
  const statusCode = error instanceof Error ? getStatusCodeFromError(error) : 500;
  const message = error instanceof Error ? error.message : 'Unknown error';
  
  sendError(res, defaultMessage, statusCode, message);
}
