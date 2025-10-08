import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { DataSource } from 'typeorm';
import { SessionEntity } from './typeorm/entities/SessionEntity';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';






async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const reflector = app.get<Reflector>(Reflector);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    skipMissingProperties: false,
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
      secure: true,
      maxAge: parseInt(process.env.MAX_AGE),
      httpOnly: true
    },
    store: new TypeormStore({

    }).connect(sessionRepository),
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  
  app.enableCors({
    origin: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
