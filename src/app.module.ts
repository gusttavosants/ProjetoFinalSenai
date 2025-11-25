import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ControllerModule } from './controller/controller.module';
import { CollaboratorModule } from './collaborator/collaborator.module';

@Module({
  imports: [CourseModule, EnrollmentModule, ControllerModule, CollaboratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
