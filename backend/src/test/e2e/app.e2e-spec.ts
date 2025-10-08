
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { DataSource } from 'typeorm';
import { SessionEntity } from '../../typeorm/entities/SessionEntity';


const URL_Login = '/auth/login';
const URL_Login_test = '?code=2-6OURR&password=tbGMHLofDhckiIDlVpgfJdq6o718pGQE';
const URL_Login_test_unauthorized = '?code=2-6OUR-&password=tbGMHLofDhckiIDlVpgfJdq6o718pGQE';
const URL_Login_test_unauthorized_ = '?code=2-6OURR&password=tbGMHLofDhckiIDlVpgfJdq6o718pGQe';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const reflector = app.get<Reflector>(Reflector);
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
    app.use(session({
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: 'none',
        secure: false,
        maxAge: parseInt(process.env.MAX_AGE),
        httpOnly: true
      },
      store: new TypeormStore({}).connect(sessionRepository),
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    // app.use((req, res, next) => {
    //   req.session = {
    //     user: {
    //       firstName: 'Ada-Charles',
    //       lastName: 'Gabbage-Lovelace',
    //     },
    //   };
    //   next();
    // });
    
    app.enableCors({
      origin: true,
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    });
    await app.init();

  });

  it('/ (GET)', () => {
      return request(app.getHttpServer())
          .get('/')
          .expect(200)
          .expect('Welcome! Willkommen! Benvenuto! Bienvenue! Tervetuloa! Irasshaimase!');
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post(URL_Login + URL_Login_test)
      .expect(301);
      /*.end((err, res) => {
          console.log(res.headers);
      })*/
  });

  it('/auth/login (POST)', () => {
    app.use((session, req, res, next) => {
      session.passport.user = {
          companyName: 'TheCompany',
          role: 'merchant'
        },
      next();
    });

    return request(app.getHttpServer())
      .post(URL_Login + URL_Login_test)
      .expect(301);
      /*.end((err, res) => {
          console.log(res.headers);
      })*/
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post(URL_Login + URL_Login_test_unauthorized)
      .expect(401);
      /*.end((err, res) => {
          console.log(res.headers);
      })*/
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post(URL_Login + URL_Login_test_unauthorized_)
      .expect(401);
      /*.end((err, res) => {
          console.log(res.headers);
      })*/
  });
  // beforeAll(async () => {
  //   return request(app.getHttpServer())
  //     .post(URL_Login + URL_Login_test)
  // });
  it('/merchant/getAll (GET)', () => {
    app.use((session, req, res, next) => {
      session.passport.user = {
          firstName: 'Ada-Charles',
          lastName: 'Gabbage-Lovelace',
          role: 'admin',
          loggedIn: true,
        },
  
      next();
    });
    return request(app.getHttpServer())
      .get('merchant/getAll')
      .expect(401);
  });
  it('/merchant/changeEmail (GET)', () => {
    return request(app.getHttpServer())
      .get('merchant/changeEmail/2-6OURR')
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
 })