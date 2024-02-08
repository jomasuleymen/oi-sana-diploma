import { Test, TestingModule } from '@nestjs/testing';
import { MeditationController } from '../meditation.controller';
import { MeditationService } from '../meditation.service';

describe('MeditationController', () => {
  let controller: MeditationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeditationController],
      providers: [MeditationService],
    }).compile();

    controller = module.get<MeditationController>(MeditationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
