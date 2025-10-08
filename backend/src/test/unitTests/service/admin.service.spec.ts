import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../../../user/admin/admin.service';

import { CreateAdminDto } from '../../../user/admin/dtos/CreateAdmin.dto'; 
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '../../../typeorm/entities/AdminEntity';
import { AppService } from '../../../app.service';
import { UpdateAdminPasswordDto } from '../../../user/admin/dtos/UpdateAdminPassword.dto';
import { mockAdmin, mockCreateAdminDto, mockUpdateAdminPasswordDto, mockUpdatedAdmin } from '../mocks/admin.mocks';



describe('AdminService', () => {
	let adminService: AdminService;
	let appService: AppService;
	let adminRepository: Repository<AdminEntity>;


	beforeEach(async () => {
		const admin: TestingModule = await Test.createTestingModule({
			providers: [AdminService, {
				provide: getRepositoryToken(AdminEntity),
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						find: jest.fn(),
						findOneBy: jest.fn(),
						findOne: jest.fn(),
						update: jest.fn().mockReturnValue(mockUpdatedAdmin),
						delete: jest.fn(),
            count: jest.fn(),
					}
				}],
			})
			.compile();

			const app: TestingModule = await Test.createTestingModule({
				providers: [AppService]
			}).compile();


			adminService = admin.get<AdminService>(AdminService);
			appService = app.get<AppService>(AppService);
			adminRepository = admin.get<Repository<AdminEntity>>(getRepositoryToken(AdminEntity));

				
		
		});

    describe('AdminService', () => {
      it('should be defined', () => {
        expect(adminService).toBeDefined();
      });
    });
		
    describe('adminRepository', () => {
      it('adminRepository should be defined', () => {
        expect(adminRepository).toBeDefined();
      });
    });


		
    describe('createAdmin', () => {
      it('should create a new user with a hashed password', async () => {
        await adminService.createAdmin(mockAdmin.password, mockAdmin.code, mockAdmin.createdAt, mockCreateAdminDto)
        
        expect(adminRepository.create).toHaveBeenCalledWith({...mockCreateAdminDto, code: mockAdmin.code, password: mockAdmin.password, createdAt: mockAdmin.createdAt});
        expect(adminRepository.save).toHaveBeenCalled();
        expect(adminRepository.save).toHaveBeenCalledTimes(1);
      });
    });


    describe('getAllAdmins', () => {
      it('should return all admins', async() => {
        const result = await adminService.getAllAdmins();
        expect(adminRepository.find).toHaveBeenCalledTimes(1);
      });
    });
    

    describe('getAdminByCode', () => {
      it('should return an admin by code', async() => {
        const result = await adminService.getAdminByCode(mockAdmin.code);
        expect(adminRepository.findOneBy).toHaveBeenCalledTimes(1);
      });
    });

    describe('updateAdminPassword', () => {
      it('should update user with a hashed password', async() => {
        const mockPassword = jest.spyOn(appService as any, 'generateRandom').mockReturnValueOnce('hashedPassword');
        const result = await adminService.updateAdminPassword(mockAdmin.code, mockUpdateAdminPasswordDto);
        expect(adminRepository.update).toHaveBeenCalled();
        expect(result).toBe(mockUpdatedAdmin)
      });
    });




		

});

