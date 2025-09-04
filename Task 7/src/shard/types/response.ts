export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

// Base response interface without optional properties
interface BaseApiResponse {
  success: boolean;
  message: string;
  code: number;
  timestamp: Date;
}

// Specific response types for better type safety
export interface SuccessResponse<T> extends BaseApiResponse {
  success: true;
  data: T; // Required when success is true
  error?: never;
}

export interface ErrorResponse extends BaseApiResponse {
  success: false;
  data?: never;
  error: string;
}

export interface PaginatedResponse<T> extends SuccessResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export type ApiResponse<T = any> =
  | SuccessResponse<T>
  | ErrorResponse
  | PaginatedResponse<T>;
