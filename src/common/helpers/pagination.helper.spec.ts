import {
  buildFindManyResult,
  buildPaginationInfo,
  normalizePagination,
  PAGINATION_DEFAULTS,
} from './pagination.helper';

describe('Pagination Helper', () => {
  describe('buildPaginationInfo', () => {
    it('should calculate pagination info correctly for first page', () => {
      const result = buildPaginationInfo({
        page: 1,
        perPage: 10,
        total: 50,
      });

      expect(result).toEqual({
        page: 1,
        perPage: 10,
        totalPages: 5,
        hasNext: true,
        hasPrevious: false,
      });
    });

    it('should calculate pagination info correctly for middle page', () => {
      const result = buildPaginationInfo({
        page: 3,
        perPage: 10,
        total: 50,
      });

      expect(result).toEqual({
        page: 3,
        perPage: 10,
        totalPages: 5,
        hasNext: true,
        hasPrevious: true,
      });
    });

    it('should calculate pagination info correctly for last page', () => {
      const result = buildPaginationInfo({
        page: 5,
        perPage: 10,
        total: 50,
      });

      expect(result).toEqual({
        page: 5,
        perPage: 10,
        totalPages: 5,
        hasNext: false,
        hasPrevious: true,
      });
    });

    it('should handle total of 0', () => {
      const result = buildPaginationInfo({
        page: 1,
        perPage: 10,
        total: 0,
      });

      expect(result).toEqual({
        page: 1,
        perPage: 10,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
      });
    });

    it('should handle single item', () => {
      const result = buildPaginationInfo({
        page: 1,
        perPage: 10,
        total: 1,
      });

      expect(result).toEqual({
        page: 1,
        perPage: 10,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
      });
    });

    it('should handle uneven division of total by perPage', () => {
      const result = buildPaginationInfo({
        page: 1,
        perPage: 10,
        total: 25,
      });

      expect(result).toEqual({
        page: 1,
        perPage: 10,
        totalPages: 3,
        hasNext: true,
        hasPrevious: false,
      });
    });

    it('should handle large numbers', () => {
      const result = buildPaginationInfo({
        page: 50,
        perPage: 100,
        total: 10000,
      });

      expect(result).toEqual({
        page: 50,
        perPage: 100,
        totalPages: 100,
        hasNext: true,
        hasPrevious: true,
      });
    });
  });

  describe('buildFindManyResult', () => {
    it('should build complete FindManyResult with data and pagination', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const result = buildFindManyResult(data, {
        page: 1,
        perPage: 10,
        total: 30,
      });

      expect(result).toEqual({
        data,
        total: 30,
        pagination: {
          page: 1,
          perPage: 10,
          totalPages: 3,
          hasNext: true,
          hasPrevious: false,
        },
      });
    });

    it('should handle empty data array', () => {
      const result = buildFindManyResult([], {
        page: 1,
        perPage: 10,
        total: 0,
      });

      expect(result).toEqual({
        data: [],
        total: 0,
        pagination: {
          page: 1,
          perPage: 10,
          totalPages: 0,
          hasNext: false,
          hasPrevious: false,
        },
      });
    });

    it('should handle complex data types', () => {
      interface User {
        id: string;
        name: string;
        email: string;
      }

      const users: User[] = [
        { id: '1', name: 'John', email: 'john@example.com' },
        { id: '2', name: 'Jane', email: 'jane@example.com' },
      ];

      const result = buildFindManyResult(users, {
        page: 2,
        perPage: 2,
        total: 10,
      });

      expect(result.data).toEqual(users);
      expect(result.total).toBe(10);
      expect(result.pagination.page).toBe(2);
      expect(result.pagination.totalPages).toBe(5);
    });
  });

  describe('normalizePagination', () => {
    it('should return defaults when no parameters provided', () => {
      const result = normalizePagination();

      expect(result).toEqual({
        page: PAGINATION_DEFAULTS.PAGE,
        perPage: PAGINATION_DEFAULTS.PER_PAGE,
        skip: 0,
        take: PAGINATION_DEFAULTS.PER_PAGE,
      });
    });

    it('should normalize valid parameters', () => {
      const result = normalizePagination(2, 20);

      expect(result).toEqual({
        page: 2,
        perPage: 20,
        skip: 20,
        take: 20,
      });
    });

    it('should enforce minimum page of 1', () => {
      const result = normalizePagination(0, 10);

      expect(result.page).toBe(1);
      expect(result.skip).toBe(0);
    });

    it('should enforce minimum page of 1 for negative values', () => {
      const result = normalizePagination(-5, 10);

      expect(result.page).toBe(1);
      expect(result.skip).toBe(0);
    });

    it('should use default perPage when 0 is provided', () => {
      const result = normalizePagination(1, 0);

      expect(result.perPage).toBe(PAGINATION_DEFAULTS.PER_PAGE);
      expect(result.take).toBe(PAGINATION_DEFAULTS.PER_PAGE);
    });

    it('should enforce minimum perPage of 1 for negative values', () => {
      const result = normalizePagination(1, -10);

      expect(result.perPage).toBe(1);
      expect(result.take).toBe(1);
    });

    it('should enforce maximum perPage of 100', () => {
      const result = normalizePagination(1, 200);

      expect(result.perPage).toBe(PAGINATION_DEFAULTS.MAX_PER_PAGE);
      expect(result.take).toBe(PAGINATION_DEFAULTS.MAX_PER_PAGE);
    });

    it('should calculate skip correctly', () => {
      const result = normalizePagination(3, 10);

      expect(result.skip).toBe(20); // (3 - 1) * 10
    });

    it('should calculate skip correctly for first page', () => {
      const result = normalizePagination(1, 25);

      expect(result.skip).toBe(0);
    });

    it('should calculate skip correctly for large page numbers', () => {
      const result = normalizePagination(100, 50);

      expect(result.skip).toBe(4950); // (100 - 1) * 50
    });

    it('should handle undefined page with defined perPage', () => {
      const result = normalizePagination(undefined, 25);

      expect(result).toEqual({
        page: 1,
        perPage: 25,
        skip: 0,
        take: 25,
      });
    });

    it('should handle defined page with undefined perPage', () => {
      const result = normalizePagination(5, undefined);

      expect(result).toEqual({
        page: 5,
        perPage: PAGINATION_DEFAULTS.PER_PAGE,
        skip: 40,
        take: PAGINATION_DEFAULTS.PER_PAGE,
      });
    });
  });

  describe('PAGINATION_DEFAULTS', () => {
    it('should have correct default values', () => {
      expect(PAGINATION_DEFAULTS.PAGE).toBe(1);
      expect(PAGINATION_DEFAULTS.PER_PAGE).toBe(10);
      expect(PAGINATION_DEFAULTS.MAX_PER_PAGE).toBe(100);
    });
  });
});
