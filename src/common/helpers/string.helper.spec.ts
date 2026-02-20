import { capitalize, stringToSlug, truncate } from './string.helper';

describe('String Helper', () => {
  describe('stringToSlug', () => {
    it('should convert string to lowercase slug', () => {
      const result = stringToSlug('Hello World');

      expect(result).toBe('hello-world');
    });

    it('should remove special characters', () => {
      const result = stringToSlug('Hello @#$ World!');

      expect(result).toBe('hello-world');
    });

    it('should remove accents and diacritics', () => {
      const result = stringToSlug('Café São Paulo');

      expect(result).toBe('cafe-sao-paulo');
    });

    it('should replace multiple spaces with single dash', () => {
      const result = stringToSlug('Hello    World');

      expect(result).toBe('hello-world');
    });

    it('should remove leading and trailing dashes', () => {
      const result = stringToSlug('  Hello World  ');

      expect(result).toBe('hello-world');
    });

    it('should handle strings with multiple dashes', () => {
      const result = stringToSlug('Hello---World');

      expect(result).toBe('hello-world');
    });

    it('should handle empty strings', () => {
      const result = stringToSlug('');

      expect(result).toBe('');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter and lowercase rest', () => {
      const result = capitalize('hello');

      expect(result).toBe('Hello');
    });

    it('should handle all uppercase', () => {
      const result = capitalize('HELLO');

      expect(result).toBe('Hello');
    });

    it('should handle mixed case', () => {
      const result = capitalize('hELLO');

      expect(result).toBe('Hello');
    });

    it('should return empty string for empty input', () => {
      const result = capitalize('');

      expect(result).toBe('');
    });

    it('should handle single character', () => {
      const result = capitalize('a');

      expect(result).toBe('A');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      const result = truncate('This is a very long string', 10);

      expect(result).toBe('This is a ...');
    });

    it('should not truncate short strings', () => {
      const result = truncate('Short', 10);

      expect(result).toBe('Short');
    });

    it('should use custom suffix', () => {
      const result = truncate('This is a very long string', 10, '---');

      expect(result).toBe('This is a ---');
    });

    it('should handle exact length match', () => {
      const result = truncate('Exactly10!', 10);

      expect(result).toBe('Exactly10!');
    });

    it('should handle empty suffix', () => {
      const result = truncate('This is a very long string', 10, '');

      expect(result).toBe('This is a ');
    });
  });
});
