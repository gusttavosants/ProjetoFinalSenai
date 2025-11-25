import { Module } from '@nestjs/common';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorService } from './collaborator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './entity/collaborator.entity';

@Module({
  imports: [TypeOrmModule.forFeature ([Collaborator])],
  controllers: [CollaboratorController],
  providers: [CollaboratorService]
})
export class CollaboratorModule {}
