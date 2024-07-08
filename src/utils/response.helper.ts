import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export const createApiResponse = <T = any>(
  code: number,
  message: string,
  data?: T,
): ApiResponse<T> => {
  return { code, message, data };
};

export const successResponse = <T = any>(
  message: string,
  data?: T,
): ApiResponse<T> => {
  return createApiResponse(HttpStatus.OK, message, data);
};

export const createdResponse = <T = any>(
  message: string,
  data?: T,
): ApiResponse<T> => {
  return createApiResponse(HttpStatus.CREATED, message, data);
};

export const errorResponse = <T = any>(
  message: string,
  code = HttpStatus.INTERNAL_SERVER_ERROR,
  data?: T,
): ApiResponse<T> => {
  return createApiResponse(code, message, data);
};
