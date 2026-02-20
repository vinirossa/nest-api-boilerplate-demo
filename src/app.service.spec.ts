import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return a welcome message with timestamp', () => {
      const result = service.getHello();

      expect(result).toHaveProperty('message', 'API is running');
      expect(result).toHaveProperty('timestamp');
      expect(typeof result.timestamp).toBe('string');
      expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
    });

    it('should return current timestamp', () => {
      const beforeCall = new Date().toISOString();
      const result = service.getHello();
      const afterCall = new Date().toISOString();

      expect(result.timestamp >= beforeCall).toBe(true);
      expect(result.timestamp <= afterCall).toBe(true);
    });

    it('should return different timestamps on multiple calls', () => {
      const result1 = service.getHello();
      // Small delay to ensure different timestamps
      setTimeout(() => {
        const result2 = service.getHello();
        expect(result1.timestamp !== result2.timestamp).toBe(true);
      }, 1);
    });
  });

  describe('service definition', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
