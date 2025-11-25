import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ProjetoFinal',
      autoLoadEntities: true,
      synchronize: false, 
      }),
    CourseModule, EnrollmentModule, CollaboratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
