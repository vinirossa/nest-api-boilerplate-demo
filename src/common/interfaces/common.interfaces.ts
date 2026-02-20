/**
 * Pagination interface for paginated responses
 */
export interface PaginationInfo {
  page: number;
  perPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Generic findMany result with pagination
 */
export interface FindManyResult<T> {
  data: T[];
  total: number;
  pagination: PaginationInfo;
}

/**
 * Generic API response
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}
