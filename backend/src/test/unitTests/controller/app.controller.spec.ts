import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../../app.controller';
import { AppService } from '../../../app.service';


describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],

    }).compile();

    appController = app.get<AppController>(AppController);

  });

  describe('AppService', () => {
    it('should be defined', () => {
        expect(appController).toBeDefined();
    })
  });

  
  describe('Route getHello (GET)', () => {
    it('should be defined', () => {
      expect(appController.getHello()).toBeDefined();
    });
  });

  describe('getHelloRoute getHello (GET)', () => {
    it('should return "Welcome! Willkommen! Benvenuto! Bienvenue! Tervetuloa! Irasshaimase!"', () => {
      expect(appController.getHello()).toBe('Welcome! Willkommen! Benvenuto! Bienvenue! Tervetuloa! Irasshaimase!');
    });
  });





});




