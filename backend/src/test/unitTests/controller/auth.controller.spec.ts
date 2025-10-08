import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '../../../user/admin/admin.service'; 
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppService } from '../../../app.service';
import { AdminController } from '../../../user/admin/admin.controller';
import { MailService } from '../../../mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthController } from '../../../auth/auth.controller';
import { MerchantService } from '../../../user/merchant/merchant.service';
import { CustomerService } from '../../../user/customer/customer.service';
import { CustomerEntity, MerchantEntity, AdminEntity } from '../../../typeorm/entitiesIndex';
import { AuthService } from '../../../auth/auth.service';
import { Session } from '@nestjs/common';




describe('AuthController', () => {
  let authController: AuthController;

  // const mockSession = {

  //     user: {
  //       id: '2',
  //       code: '2-6OURR',
  //       email: 'testCompany73@gmail.com',
  //       address: 'Rubidiumstraße 37',
  //       postcode: '85468',
  //       city: 'Sundsvall',
  //       mobileNumber: '7331314159265',
  //       password: '$2b$10$lIQemxx96pAeI2ll2m7MVOmVArfzvgKxAjDpIzexaWE84lOdBSN4i',
  //       createdAt: 2024-02-15T12:26:07.000Z,
  //       companyName: 'TheCompany',
  //       country: 'Sweden',
  //       telephoneNumber: '1337314159265',
  //       role: 'merchant'
  //     }

  // };

  const requestMock = {
    query: {}
    // user: {
    //     id: '2',
    //     code: '2-6OURR',
    //     email: 'testCompany73@gmail.com',
    //     address: 'Rubidiumstraße 37',
    //     postcode: '85468',
    //     city: 'Sundsvall',
    //     mobileNumber: '7331314159265',
    //     password: '$2b$10$lIQemxx96pAeI2ll2m7MVOmVArfzvgKxAjDpIzexaWE84lOdBSN4i',
    //     createdAt: 2024-02-15T12:26:07.000Z,
    //     companyName: 'TheCompany',
    //     country: 'Sweden',
    //     telephoneNumber: '1337314159265',
    //     role: 'merchant'
    //   }
  } as unknown as Request;

  const responseMock = {
    status: jest.fn((x) => ({
      send: jest.fn((y) => y)
    })),
    send: jest.fn((x) => x)
  } as unknown as Response;


	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
      providers: [
        { provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          }
        },
        { provide: AdminService,
          useValue: {
            getAllAdmins: jest.fn(),
            getAdminByCode: jest.fn(),
            upadteAdminPassword: jest.fn(),
            updateAdminAddress: jest.fn(),
            updateAdminPhoneNumber: jest.fn(),
            updateAdminEmail: jest.fn(),
            deleteAdmin: jest.fn(),
          }
        },
        {provide: MerchantService,
          useValue: {
            createMerchant: jest.fn(),
            getAllMerchants: jest.fn(),
            getMerchantByParam: jest.fn(),
            updateMerchantPassword: jest.fn(),
            updateMerchantAddress: jest.fn(),
            updateMerchantEmail: jest.fn(),
            updateMerchantPhoneNumber: jest.fn(),
            deleteMerchant: jest.fn(),

        }},
        {provide: CustomerService,
          useValue: {
            createCustomer: jest.fn(),
            getAllCustomers: jest.fn(),
            getCustomerByParam: jest.fn(),
            updateCustomerPassword: jest.fn(),
            updateCustomerAddress: jest.fn(),
            updateCustomerEmail: jest.fn(),
            updateCustomerPhoneNumber: jest.fn(),
            resetCustomerPassword: jest.fn(),
            deleteCustomer: jest.fn(),

      }},   
        {
          provide: AppService,
          useValue: {
            generateRandom: jest.fn(),
            getHello: jest.fn(),
        }},        
        {
				provide: getRepositoryToken(AdminEntity),
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
          },
          {
            provide: getRepositoryToken(CustomerEntity),
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
          provide: MailService,
          useValue: {
            sendEmailNewAccount: jest.fn(),
            sendNewPassword: jest.fn(),
            sendOrderToCustomer: jest.fn(),
            sendOrderToMerchant: jest.fn()
          }},
          {
            provide: MailerService,
            useValue: {
              sendMail: jest.fn()
            }
          }]
			})
			.compile();

      authController = module.get<AuthController>(AuthController);	
		});

  it('should be defined', () => {
		expect(authController).toBeDefined();
	});

  // it('should be defined', () => {
  //   authController.login(mockSession, requestMock, responseMock);
	// 	expect(authController.login).toBeDefined();
	// });

  
});