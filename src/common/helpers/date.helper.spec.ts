import { addDays, formatDateToISO, isFuture, isPast, subtractDays } from './date.helper';

describe('Date Helper', () => {
  describe('formatDateToISO', () => {
    it('should format date to ISO string', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDateToISO(date);

      expect(result).toBe('2024-01-15T10:30:00.000Z');
    });
  });

  describe('isPast', () => {
    it('should return true for past dates', () => {
      const pastDate = new Date('2020-01-01');

      expect(isPast(pastDate)).toBe(true);
    });

    it('should return false for future dates', () => {
      const futureDate = new Date(Date.now() + 86400000); // Tomorrow

      expect(isPast(futureDate)).toBe(false);
    });
  });

  describe('isFuture', () => {
    it('should return true for future dates', () => {
      const futureDate = new Date(Date.now() + 86400000); // Tomorrow

      expect(isFuture(futureDate)).toBe(true);
    });

    it('should return false for past dates', () => {
      const pastDate = new Date('2020-01-01');

      expect(isFuture(pastDate)).toBe(false);
    });
  });

  describe('addDays', () => {
    it('should add days to a date', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const result = addDays(date, 5);

      expect(result.getUTCDate()).toBe(20);
    });

    it('should handle month transitions', () => {
      const date = new Date('2024-01-30T12:00:00Z');
      const result = addDays(date, 5);

      expect(result.getUTCMonth()).toBe(1); // February (0-indexed)
      expect(result.getUTCDate()).toBe(4);
    });

    it('should not modify the original date', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const originalTime = date.getTime();

      addDays(date, 5);

      expect(date.getTime()).toBe(originalTime);
    });
  });

  describe('subtractDays', () => {
    it('should subtract days from a date', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const result = subtractDays(date, 5);

      expect(result.getUTCDate()).toBe(10);
    });

    it('should handle month transitions backwards', () => {
      const date = new Date('2024-02-05T12:00:00Z');
      const result = subtractDays(date, 10);

      expect(result.getUTCMonth()).toBe(0); // January (0-indexed)
      expect(result.getUTCDate()).toBe(26);
    });

    it('should not modify the original date', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const originalTime = date.getTime();

      subtractDays(date, 5);

      expect(date.getTime()).toBe(originalTime);
    });
  });
});
