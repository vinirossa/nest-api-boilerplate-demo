import { FindManyResult, PaginationInfo } from '../interfaces';

export interface BuildPaginationParams {
  page: number;
  perPage: number;
  total: number;
}

/**
 * Builds pagination info from basic parameters
 */
export function buildPaginationInfo(params: BuildPaginationParams): PaginationInfo {
  const { page, perPage, total } = params;
  const totalPages = Math.ceil(total / perPage);

  return {
    page,
    perPage,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
}

/**
 * Builds complete FindManyResult with pagination
 */
export function buildFindManyResult<T>(data: T[], params: BuildPaginationParams): FindManyResult<T> {
  return {
    data,
    total: params.total,
    pagination: buildPaginationInfo(params),
  };
}

/**
 * Default pagination constants
 */
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  PER_PAGE: 10,
  MAX_PER_PAGE: 100,
} as const;

/**
 * Normalize pagination parameters with defaults and limits
 */
export function normalizePagination(page?: number, perPage?: number) {
  const normalizedPage = Math.max(1, page || PAGINATION_DEFAULTS.PAGE);
  const normalizedPerPage = Math.min(
    PAGINATION_DEFAULTS.MAX_PER_PAGE,
    Math.max(1, perPage || PAGINATION_DEFAULTS.PER_PAGE),
  );

  return {
    page: normalizedPage,
    perPage: normalizedPerPage,
    skip: (normalizedPage - 1) * normalizedPerPage,
    take: normalizedPerPage,
  };
}
