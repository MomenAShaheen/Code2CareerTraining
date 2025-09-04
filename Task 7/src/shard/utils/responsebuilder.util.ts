import {
  SuccessResponse,
  ErrorResponse,
  PaginatedResponse,
  PaginationParams,
} from "../types/response";

export class ResponseBuilder {
  static success<T>(
    message: string,
    data: T,
    code: number = 200
  ): SuccessResponse<T> {
    return {
      success: true,
      message,
      data,
      code,
      timestamp: new Date(),
    };
  }

  static ok<T>(
    data: T,
    message: string = "Operation successful"
  ): SuccessResponse<T> {
    return this.success(message, data, 200);
  }

  static paginated<T>(
    data: T[],
    pagination: PaginationParams,
    message: string = "Data retrieved successfully"
  ): PaginatedResponse<T> {
    const { page, limit, total } = pagination;
    const pages = Math.ceil(total / limit);

    return {
      success: true,
      message,
      data,
      code: 200,
      timestamp: new Date(),
      pagination: {
        page,
        limit,
        total,
        pages,
        hasNext: page < pages,
        hasPrev: page > 1,
      },
    };
  }

  static error(
    message: string,
    code: number = 500,
    error?: string
  ): ErrorResponse {
    return {
      success: false,
      message,
      error: error || message,
      code,
      timestamp: new Date(),
    };
  }

  // Helper for empty responses
  static empty(
    message: string = "Operation successful",
    code: number = 200
  ): SuccessResponse<null> {
    return this.success(message, null, code);
  }
}
