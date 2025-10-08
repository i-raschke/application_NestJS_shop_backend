import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from '../../../user/admin/admin.controller';
import { AdminService } from '../../../user/admin/admin.service'; 
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdminEntity } from '../../../typeorm/entities/AdminEntity';
import { AppService } from '../../../app.service';
import { MailService } from '../../../mail/mail.service';
import { hashPassword } from '../../../utils/bcrypt';
import { mockAdmin, mockCreateAdminDto, mockUpdateAdminPasswordDto, mockUpdateAdminAddressDto, mockUpdateAdminPhoneNumberDto, mockUpdatedAdmin, mockUpdateAdminEmailDto, mockSessionAdmin, mockSessionWrongRole } from '../../../test/unitTests/mocks/admin.mocks';
import { plainToClass } from 'class-transformer';
import { SerializedAdmin } from '../../../utils/serializer';
import * as bcrypt from '../../../utils/bcrypt';
import { RolesGuard } from '../../../utils/roles.guard';
import { Role } from '../../../utils/role.enum';
import { Roles } from '../../../utils/roles.decorator';
import { MailerService } from '@nestjs-modules/mailer';

describe('AdminController', () => {
  let adminController: AdminController;
  let adminService: AdminService;
  let appService: AppService;
  let mailService: MailService;

  beforeEach(async () => {
    const admin: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            createAdmin: jest.fn().mockReturnValue(mockAdmin),
            getAllAdmins: jest.fn().mockReturnValue([mockAdmin]),
            getAdminByCode: jest.fn().mockReturnValue(mockAdmin),
            updateAdminPassword: jest.fn().mockReturnValue(mockUpdatedAdmin),
            updateAdminAddress: jest.fn().mockReturnValue(mockUpdatedAdmin),
            updateAdminPhoneNumber: jest.fn().mockReturnValue(mockAdmin),
            updateAdminEmail: jest.fn().mockReturnValue(mockAdmin),
            resetAdminPassword: jest.fn().mockReturnValue(mockUpdatedAdmin),
            deleteAdmin: jest.fn().mockReturnValue({deleted: true}),
          },
        },
        {
          provide: AppService,
          useValue: {
            generateRandom: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AdminEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn().mockReturnValue(mockUpdatedAdmin),
            count: jest.fn(),
            delete: jest.fn(),

          },
        },
        {
          provide: MailService,
          useValue: {
            sendEmailNewAccount: jest.fn(),
            sendNewPassword: jest.fn(),
            sendResetPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    adminController = admin.get<AdminController>(AdminController);
    adminService = admin.get<AdminService>(AdminService);
    appService = admin.get<AppService>(AppService);
    mailService = admin.get<MailService>(MailService);
  });


    describe('AdminController', () => {
      it('should be defined', () => {
        expect(adminController).toBeDefined();
      });
    });
		
    describe('createAdmin', () => {
      it('should return the created admin', async () => {
        const initialPassword = 'initialpassword';
        const hashedPassword = 'hashedpassword';
        const name = mockAdmin.firstName + ' ' + mockAdmin.lastName;
        const spyCreate = jest.spyOn(adminService, 'createAdmin').mockResolvedValue(mockAdmin);
        jest.spyOn(appService, 'generateRandom').mockReturnValue(mockAdmin.password);
        
        const result = await adminController.createAdmin(mockCreateAdminDto, mockSessionAdmin);
        expect(mailService.sendEmailNewAccount(name, mockAdmin.code, hashedPassword)).toHaveBeenCalled;
        expect(spyCreate).toHaveBeenCalled();
      })
    });

    describe('createAdmin', () => {
      it('should not return a created admin if not another admin creates this account', async () => {
        const initialPassword = 'initialpassword';
        const hashedPassword = 'hashedpassword';
        const name = mockAdmin.firstName + ' ' + mockAdmin.lastName;
        const spyCreate = jest.spyOn(adminService, 'createAdmin').mockResolvedValue(mockAdmin);
        jest.spyOn(appService, 'generateRandom').mockReturnValue(mockAdmin.password);
        
        const result = await adminController.createAdmin(mockCreateAdminDto, mockSessionWrongRole);
        expect(mailService.sendEmailNewAccount(name, mockAdmin.code, hashedPassword)).toHaveBeenCalled;
        expect(spyCreate).toHaveBeenCalled();
        //expect(result).toBe('Invalid Request');
      })
    });

    describe('getAllAdmins', () => {
      it('should return a list of admins', async() => {
        const spy = jest.spyOn(adminService, 'getAllAdmins').mockResolvedValue([mockAdmin]);
        const result = await adminController.getAllAdmins();
        const mockSerializedAdmins = [mockAdmin];
        expect(spy).toHaveBeenCalled();

        //expect(result).toEqual(mockSerializedAdmins.map((admin) => plainToClass(SerializedAdmin, admin)));
      });
    });


    describe('getAllAdmins', () => {
      it('should return all admins', async () => {
        const admins = [mockAdmin];
        jest.spyOn(adminService, 'getAllAdmins').mockResolvedValue(admins);
  
        const result = await adminController.getAllAdmins();
  
        expect(result).toEqual([plainToClass(SerializedAdmin, admins[0])]);
      });
    });

    describe('getAdminByCode', () => {
      it('should return an admin by code', async() => {
        const spy = jest.spyOn(adminService, 'getAdminByCode').mockResolvedValue(mockAdmin);
        const result = await adminController.getAdminByCode(mockAdmin.code);
        expect(spy).toHaveBeenCalledTimes(1);

        //expect(result).toEqual(mockSerializedAdmins.map((admin) => plainToClass(SerializedAdmin, admin)));
      });
    });

    describe('updateAdminPassword', () => {
      it('should update the password of an update and send an email', async() => {
        const spy = jest.spyOn(adminService, 'updateAdminPassword');
        const spyMail = jest.spyOn(mailService, 'sendNewPassword');
        const result = await adminController.updateAdminPassword(mockSessionAdmin, mockUpdateAdminPasswordDto);
        //expect(result).toBe(mockUpdatedAdmin);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spyMail).toHaveBeenCalledTimes(1);
      });
    });

    describe('updateAdminAddress', () => {
      it('should update the address of the admin', async() => {
        const spy = jest.spyOn(adminService, 'updateAdminAddress');
        const result = await adminController.updateAdminAddress(mockSessionAdmin, mockUpdateAdminAddressDto);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toBe(mockUpdatedAdmin);
      });
    });

    describe('updateAdminPhoneNumber', () => {
      it('shoud update the phone number of the admin', async() => {
        const spy = jest.spyOn(adminService, 'updateAdminPhoneNumber');
        const result = await adminController.updateAdminPhoneNumber(mockSessionAdmin, mockUpdateAdminPhoneNumberDto);
        expect(spy).toHaveBeenCalledTimes(1);
        
      });
    });

    describe('updateAdminEmail', () => {
      it('should update the email address of the admin', async() => {
        const spy = jest.spyOn(adminService, 'updateAdminEmail');
        const result = await adminController.updateAdminEmail(mockSessionAdmin, mockUpdateAdminEmailDto);
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('resetPassword', () => {
      it('should reset the password of the admin', async() => {
        const mockNewPassword = 'newpassword';
        const mockHashedNewPassword = 'hashedNewpassword';
        jest.spyOn(appService, 'generateRandom').mockReturnValue(mockHashedNewPassword);
        const spyGetAdmin = jest.spyOn(adminService, 'getAdminByCode');
        const spyResetAdminPassword = jest.spyOn(adminService, 'resetAdminPassword');
        const spySendResetPassword = jest.spyOn(mailService, 'sendResetPassword');
        const result = await adminController.resetAdminPassword(mockAdmin.code);
        expect(spyGetAdmin).toHaveBeenCalledTimes(1);
        expect(spyResetAdminPassword).toHaveBeenCalledTimes(1);
        expect(spySendResetPassword).toHaveBeenCalledTimes(1);
      })
    })

    describe('deleteAdmin', () => {
      it('should delete the admin as long as there is still another admin left', async() => {
        const spy = jest.spyOn(adminService, 'deleteAdmin');
        const result = await adminController.deleteAdmin(mockSessionAdmin);
        expect(spy).toHaveBeenCalledTimes(1);

      });
    });



		

  });


