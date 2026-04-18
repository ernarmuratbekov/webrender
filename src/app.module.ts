import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { DogsModule } from './dogs/dogs.module';
import { CatsModule } from './cats/cats.module';
import { DogsController } from './dogs/dogs.controller';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ResponseLoggedMiddleware } from './common/middlewares/responselogged.middleware';
import { Cat } from './cats/entities/cat.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { WaterBodiesModule } from './water-bodies/water-bodies.module';
import { UsersModule } from './users/users.module';



@Module({
  controllers: [CatsController, AppController, DogsController],
  providers: [CatsService, AppService, {provide: APP_GUARD, useClass: RolesGuard,}, PrismaService],
  imports: [DogsModule, CatsModule, PrismaModule, ConfigModule.forRoot({isGlobal: true,}), AuthModule, WaterBodiesModule, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(LoggerMiddleware, ResponseLoggedMiddleware)
    // .exclude(
    //   {path: 'cats', method: RequestMethod.GET},
    //   {path: 'cats/*', method: RequestMethod.POST},
    //   {path: 'dogs', method: RequestMethod.GET},
    //   {path: 'dogs/*', method: RequestMethod.POST},

    //   'cats/{*splat}',
    //   'dogs/{*splat}',
    // )
    // .forRoutes( CatsController, DogsController)
    .forRoutes({path: "cats/*", method: RequestMethod.ALL}, {path: "dogs/*", method: RequestMethod.ALL})
  }
}
