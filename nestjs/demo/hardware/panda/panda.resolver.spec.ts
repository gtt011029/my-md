import { Test, TestingModule } from '@nestjs/testing';
import { PandaResolver } from './panda.resolver';

describe('PandaResolver', () => {
  let resolver: PandaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PandaResolver],
    }).compile();

    resolver = module.get<PandaResolver>(PandaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
