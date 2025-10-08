import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../../../mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';


describe('MailService', () => {
	let mailService: MailService;
	let mailerService: MailerService;

	beforeEach(async () => {
		const mail: TestingModule = await Test.createTestingModule({
			providers: [MailService, {
				provide: MailerService,
					useValue: {
						sendMail: jest.fn(),
					},
			}],
		}).compile();
		
		mailService = mail.get<MailService>(MailService);
		mailerService = mail.get<MailerService>(MailerService);


		});

	it('MailService should be defined', () => {
		expect(mailService).toBeDefined();
	});

	it('newAccount', () => {
		expect(mailService.sendEmailNewAccount('name', 'code', 'password')).toBe('Email sent');
	});

	it('newPassword', () => {
		expect(mailService.sendNewPassword('name', 'password')).toBe('Email sent');
	});

	 
});


