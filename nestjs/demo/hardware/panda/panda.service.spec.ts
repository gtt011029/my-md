import { Test, TestingModule } from '@nestjs/testing';
import { PandaService } from './panda.service';

describe('PandaService', () => {
  let service: PandaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PandaService],
    }).compile();

    service = module.get<PandaService>(PandaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
