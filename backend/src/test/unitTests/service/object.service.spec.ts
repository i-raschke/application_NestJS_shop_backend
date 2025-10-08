import { Test, TestingModule } from '@nestjs/testing'; 
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectService } from '../../../object/object.service';
import { ObjectEntity } from '../../../typeorm/entitiesIndex';
import { Repository } from 'typeorm';
import { CreateObjectDto } from '../../../object/dtos/CreateObject.dto';
import { BadRequestException } from '@nestjs/common';
import { mockMerchant, mockCreateObjectDto, mockCreateObjectDtoNotAvailable, mockUpdateObjectAmountDto, mockUpdateObjectPriceDto, mockObject } from '../../../test/unitTests/mocks/object.mocks';




describe('ObjectService', () => {
	let objectService: ObjectService;
	let objectRepository: Repository<ObjectEntity>;


	beforeEach(async () => {
		const object: TestingModule = await Test.createTestingModule({
			providers: [ObjectService, 
        {
        provide: 
          getRepositoryToken(ObjectEntity),
          useValue: {
            create: jest.fn().mockReturnValue(mockObject),
            save: jest.fn().mockReturnValue(mockObject),
            find: jest.fn().mockReturnValue([mockObject]),
            findBy: jest.fn().mockReturnValue([mockObject]),
            findOneBy: jest.fn().mockReturnValue(mockObject),
            findOne: jest.fn().mockReturnValue(mockObject),
            update: jest.fn().mockReturnValue(mockObject),
            delete: jest.fn().mockReturnValue({deleted: true}),
        }},
				],
			})
			.compile();



		objectService = object.get<ObjectService>(ObjectService);
		objectRepository = object.get<Repository<ObjectEntity>>(getRepositoryToken(ObjectEntity));
    
    const obj = await objectService.createObject(mockCreateObjectDto, mockMerchant);
    await objectRepository.save(obj);
				
		
	});

  describe('ObjectService', () => {
		it('should be defined', async() => {
			expect(objectService).toBeDefined();
		});
  });

  describe('ObjectRepository', () => {
		it('should be defined', async () => {
			expect(objectRepository).toBeDefined();
		});
  });

  describe('getAll', () => {
		it('should be defined', async () => {
      const result = await objectService.getAllObjects();
      expect(result).toEqual([mockObject]);
      expect(result[0]).toEqual(mockObject);
      expect(objectRepository.find).toHaveBeenCalled();
		});
  });

  describe('createObject', () => {
		it('with amount > 0', async () => {
      await objectService.createObject(mockCreateObjectDto, mockMerchant);
      expect(objectRepository.create).toHaveBeenCalled();
      expect(objectRepository.save).toHaveBeenCalled();
		});

		it('with amount = 0', async () => {
      await objectService.createObject(mockCreateObjectDtoNotAvailable, mockMerchant);
      const spyCreate = jest.spyOn(objectRepository, 'create');
      const spySave = jest.spyOn(objectRepository, 'save');

      expect(spyCreate).toHaveBeenCalled();
      expect(spySave).toHaveBeenCalled();
      expect(mockCreateObjectDtoNotAvailable.available).toEqual(false);
		});

		it('create object with wrong dto should fail', async () => {
      jest.spyOn(objectRepository, 'create');
      const spySave = jest.spyOn(objectRepository, 'save');
      try{
        await objectService.createObject(new CreateObjectDto(), mockMerchant);
      }catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
        expect(spySave).toHaveBeenCalledTimes(0);
      }


		});

  });

  describe('getObjectsByAnyParam', () => {
		it('should be defined', async () => {
      const result = await objectService.getObjectsByAnyParam({color: mockObject.color});
      expect(result).toEqual([mockObject]);
		});
  });

  describe('getObjectByObjectNumber', () => {
		it('should be defined', async () => {
      const result = await objectService.getObjectByObjectNumber(mockObject.objectNumber);
      expect(result).toEqual(mockObject);
      expect(objectRepository.findOne).toHaveBeenCalled();
		});
  });

  describe('getObjectByobjectNumberWithRelationMerchant', () => {
		it('should be defined', async () => {
      const result = await objectService.getObjectByobjectNumberWithRelationMerchant(mockObject.objectNumber);
      expect(result).toEqual(mockObject);
      expect(objectRepository.findOne).toHaveBeenCalled();
		});
  });

  describe('getObjectsByCompanyName', () => {
		it('should be defined', async () => {
      const result = await objectService.getObjectsByCompanyName(mockObject.objectNumber);
      expect(result).toEqual([mockObject]);
      expect(objectRepository.find).toHaveBeenCalled();
		});
  });

  describe('getObjectsByColor', () => {
		it('should be defined', async () => {
      const result = await objectService.getObjectsByColor(mockObject.color);
      expect(result).toEqual([mockObject]);
      expect(objectRepository.find).toHaveBeenCalled();
		});
  });

  describe('getObjectsUpToPrice', () => {
		it('should be defined', async () => {
      const result = await objectService.getObjectsUpToPrice(mockObject.price);
      expect(result).toEqual([mockObject]);
      expect(objectRepository.findBy).toHaveBeenCalled();
		});
  });

  describe('updateObjectAmount', () => {
		it('should be defined', async () => {
      const result = await objectService.updateObjectAmount(mockObject.objectNumber, mockUpdateObjectAmountDto);
      expect(result).toEqual(mockObject);
      expect(objectRepository.update).toHaveBeenCalled();
		});
  });

  describe('updateObjectPrice', () => {
		it('should be defined', async () => {
      const result = await objectService.updateObjectPrice(mockObject.objectNumber, mockUpdateObjectPriceDto);
      expect(result).toEqual(mockObject);
      expect(objectRepository.update).toHaveBeenCalled();
		});
  });

  describe('deleteObject', () => {
		it('should be defined', async () => {
      const result = await objectService.deleteObject(mockObject.objectNumber);
      expect(result).toEqual({deleted: true});
      expect(objectRepository.delete).toHaveBeenCalled();
		});
  });


});
