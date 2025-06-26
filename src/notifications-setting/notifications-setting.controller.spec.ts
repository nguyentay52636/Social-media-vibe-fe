import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsSettingController } from './notifications-setting.controller';

describe('NotificationsSettingController', () => {
  let controller: NotificationsSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsSettingController],
    }).compile();

    controller = module.get<NotificationsSettingController>(NotificationsSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
