import { Test, TestingModule } from '@nestjs/testing';
import { ObjectController } from '../../../object/object.controller';
import { ObjectService } from '../../../object/object.service';
import { MerchantService } from '../../../user/merchant/merchant.service';
import { MerchantEntity, ObjectEntity } from '../../../typeorm/entitiesIndex';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SerializedObject } from '../../../utils/serializer';
import { plainToClass } from 'class-transformer';
import { mockMerchant, mockCreateObjectDto, mockUpdateObjectAmountDto, mockUpdateObjectAmountDtoNotAvailable, mockUpdateObjectPriceDto, mockObject, session } from '../../../test/unitTests/mocks/object.mocks';


describe('ObjectController', () => {
  let objectController: ObjectController;
  let objectService: ObjectService;



  beforeEach(async () => {

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ObjectController],
      providers: [
        {provide: ObjectService,
          useValue: {
            createObject: jest.fn().mockReturnValue(mockObject),
            getObjectsByAnyParam: jest.fn().mockReturnValue([mockObject]),
            getObjectsUpToPrice: jest.fn().mockReturnValue([mockObject]),
            getByObjectNumber: jest.fn().mockReturnValue(new SerializedObject(mockObject)),
            getAllObjects: jest.fn().mockReturnValueOnce([mockObject]),
            getObjectsByCompanyName: jest.fn().mockReturnValue([mockObject]),
            getObjectByobjectNumberWithRelationMerchant: jest.fn().mockReturnValue(mockObject),
            updateObjectAmount: jest.fn().mockReturnValue(mockObject),
            updateObjectPrice: jest.fn().mockReturnValue(mockObject),
            deleteObject: jest.fn().mockReturnValue({deleted: true}),
          }
        }, 
        {provide: MerchantService,
          useValue: {
            createMerchant: jest.fn(),
            getAllMerchants: jest.fn(),
            getMerchantByParam: jest.fn(),
            getMerchantByCode: jest.fn(),
            getMerchantByCompanyName: jest.fn(),
            updateMerchantPassword: jest.fn(),
            updateMerchantAddress: jest.fn(),
            updateMerchantEmail: jest.fn(),
            updateMerchantPhoneNumber: jest.fn(),
            deleteMerchant: jest.fn(),

        }},  
        {
				provide: getRepositoryToken(ObjectEntity),
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						find: jest.fn(),
						findOneBy: jest.fn(),
						findOne: jest.fn(),
						update: jest.fn(),
						delete: jest.fn(),
					}
				},
        {
          provide: getRepositoryToken(MerchantEntity),
            useValue: {
              create: jest.fn(),
              save: jest.fn(),
              find: jest.fn(),
              findOneBy: jest.fn(),
              findOne: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            }
          }
      ],

    })
    .compile();


    objectController = app.get<ObjectController>(ObjectController);
    objectService = app.get<ObjectService>(ObjectService);

    objectService.createObject(mockCreateObjectDto, mockMerchant);

  });

  describe('ObjectController', () => {
    it('should be defined', () => {
      expect(objectController).toBeDefined();
    });
  });
  
  describe('createObject', () => {
    it('should return the created object', async () => {
      const result = await objectController.createObject(session, mockCreateObjectDto);
      const spy = jest.spyOn(objectService, 'createObject').mockResolvedValue(mockObject);
      expect(result).toEqual(mockObject);
      expect(spy).toHaveBeenCalled();
    });
  });
  
  describe('getAllObjects', () => {
    it('should return a list of objects',  async () => {
      const spy = jest.spyOn(objectService, 'getAllObjects').mockResolvedValue([mockObject]);
      const result = await objectController.getAllObjects();
      const mockSerializedObjects = [mockObject];
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(mockSerializedObjects.map((object) => plainToClass(SerializedObject, object)));
    });
  });

  describe('searchObject', () => {
    it('should be defined', async () => {
      const spy = jest.spyOn(objectService, 'getObjectsByAnyParam');
      const result = await objectController.searchObject({color: mockObject.color});
      const mockSerializedObjects = [mockObject];
      expect(objectController.searchObject).toBeDefined();
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(mockSerializedObjects.map((object) => plainToClass(SerializedObject, object)));
    });
  });

  describe('getByCompanyName', () => {
    it('should be defined', async () => {
      const result = await objectController.getByCompanyName(mockMerchant.companyName);
      const spy = jest.spyOn(objectService, 'getObjectsByCompanyName');
      const mockSerializedObjects = [mockObject];
      expect(objectController.getByCompanyName).toBeDefined();
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(mockSerializedObjects.map((object) => plainToClass(SerializedObject, object)));
    });
  });

  describe('getByObjectNumber', () => {
    it('should be defined', async () => {
      const result = await objectController.getByObjectNumber(mockObject.objectNumber);
      const spy = jest.spyOn(objectService, 'getObjectByobjectNumberWithRelationMerchant');
      expect(objectController.getByObjectNumber).toBeDefined();
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(new SerializedObject(mockObject));

    });
  });

  describe('getObjectsLessEqualPrice', () => {
    it('should be defined', async () => {
      const result = await objectController.getObjectsLessEqualPrice(mockObject.price);
      const spy = jest.spyOn(objectService, 'getObjectsUpToPrice');
      expect(objectController.getObjectsLessEqualPrice).toBeDefined();
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual([mockObject]);
    });
  });

  describe('updateObjectAmount', () => {
    it('should set available to true', async () => {
      await objectController.updateObjectAmount(session, mockObject.objectNumber, mockUpdateObjectAmountDto);
      const spyGetObject = jest.spyOn(objectService, 'getObjectByobjectNumberWithRelationMerchant');
      const spy = jest.spyOn(objectService, 'updateObjectAmount');
      expect(objectController.updateObjectAmount).toBeDefined();
      expect(spyGetObject).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(mockUpdateObjectAmountDto.available).toEqual(true);

    });

    it('should set available to false', async () => {
      await objectController.updateObjectAmount(session, mockObject.objectNumber, mockUpdateObjectAmountDtoNotAvailable);
      const spyGetObject = jest.spyOn(objectService, 'getObjectByobjectNumberWithRelationMerchant');
      const spy = jest.spyOn(objectService, 'updateObjectAmount');
      expect(objectController.updateObjectAmount).toBeDefined();
      expect(spyGetObject).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(mockUpdateObjectAmountDtoNotAvailable.available).toEqual(false);

    });

    it('should return invalid request, if not a valid merchant', async () => {
      const session = {passport: { user: {companyName: '', code: ''} }};
      const result = await objectController.updateObjectAmount(session, mockObject.objectNumber, mockUpdateObjectAmountDto);
      const spyGetObject = jest.spyOn(objectService, 'getObjectByobjectNumberWithRelationMerchant');
      const spy = jest.spyOn(objectService, 'updateObjectAmount');
      expect(objectController.updateObjectAmount).toBeDefined();
      expect(spyGetObject).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(0);
      expect(result).toEqual('Invalid request');

    });
  });

  describe('updateObjectPrice', () => {
    it('should be defined', async () => {
      await objectController.updateObjectPrice(session, mockObject.objectNumber, mockUpdateObjectPriceDto);
      const spyGetObject = jest.spyOn(objectService, 'getObjectByobjectNumberWithRelationMerchant');
      const spy = jest.spyOn(objectService, 'updateObjectPrice');
      expect(objectController.updateObjectPrice).toBeDefined();
      expect(spyGetObject).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();

    });

    it('should throw "Invalid request" if object does not belong to merchant', async () => {
      const session = {passport: { user: {companyName: '', code: ''} }};
      const result = await objectController.updateObjectPrice(session, mockObject.objectNumber, mockUpdateObjectPriceDto);
      const spyGetObject = jest.spyOn(objectService, 'getObjectByobjectNumberWithRelationMerchant');
      const spy = jest.spyOn(objectService, 'updateObjectPrice');
      expect(objectController.updateObjectPrice).toBeDefined();
      expect(spyGetObject).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(0);
      expect(result).toEqual('Invalid request');
    });

  });

  describe('delete', () => {

    it('should delete Object, if it belongs to merchant', async () => {
      const session = {passport: { user: {companyName: mockMerchant.companyName, code: ''} }};
      objectService.createObject(mockCreateObjectDto, session.passport.user as MerchantEntity);
      const object = mockObject;      
      jest.spyOn(objectService, 'getObjectByobjectNumberWithRelationMerchant').mockResolvedValue(mockObject);      
      const spy = jest.spyOn(objectService, 'deleteObject');      
      const result = await objectController.deleteObject(session, mockObject.objectNumber); 
      expect(objectController.deleteObject).toBeDefined();
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual({deleted: true});
    });

    it('should not delete Object, if it does not belong to user', async () => {
      const session = {passport: { user: {companyName: 'fake', code: ''} }};
      objectService.createObject(mockCreateObjectDto, session.passport.user as MerchantEntity);
      jest.spyOn(objectService, 'getObjectByobjectNumberWithRelationMerchant').mockResolvedValue(mockObject);     
      const spy = jest.spyOn(objectService, 'deleteObject');
      const result = await objectController.deleteObject(session, mockObject.objectNumber); 
      expect(objectController.deleteObject).toBeDefined();
      expect(spy).toHaveBeenCalledTimes(0);
      expect(result).toEqual('Invalid request');
    });
  });


});




