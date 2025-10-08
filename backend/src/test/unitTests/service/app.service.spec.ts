import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../../app.controller';
import { AppService } from '../../../app.service';


describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],

    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);

    await app.init();

  });

  describe('AppService', () => {
    it('should be defined', () => {
        expect(appService).toBeDefined();
    })
  });

  describe('AppService', () => {
    it('should be defined', () => {
        expect(appService.generateRandom).toBeDefined();
    })
  });

  describe('AppService', () => {
    it('should be defined', () => {
        expect(appService.getHello).toBeDefined();
    })
  });


  describe('getHello', () => {
    it('should return "Welcome! Willkommen! Benvenuto! Bienvenue! Tervetuloa! Irasshaimase!"', () => {
      expect(appService.getHello()).toBe('Welcome! Willkommen! Benvenuto! Bienvenue! Tervetuloa! Irasshaimase!');
    });
  });


});




