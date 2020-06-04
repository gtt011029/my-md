// 应用程序的根模块
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats.controller';
import { AppService } from './app.service';
import { CatsService } from './cats.service';
import { DogService } from './dog/dog.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PandaService } from './hardware/panda/panda.service';
import { PandaResolver } from './hardware/panda/panda.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, DogService, PandaService, PandaResolver],
})
export class AppModule {}
