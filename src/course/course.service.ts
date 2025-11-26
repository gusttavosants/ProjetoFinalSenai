import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    findAll(): Promise<Course[]> {
        return this.courseRepository.find();
    }

    async create(createDto: any): Promise<Course> {
        const course = this.courseRepository.create(createDto);
        await this.courseRepository.save(course);
        return {message: 'Curso criado com sucesso'} as any;
    }

    async update(id,updateDto: any): Promise<Course> {
        const course = await this.courseRepository.findOneBy({ id });
        if (!course) {
            return { message: 'Curso não encontrado' } as any;
        }

        await this.courseRepository.update(course, updateDto);
        return {message: 'Curso atualizado com sucesso'} as any;
    }

    async remove(id: number): Promise<void> {
        const course = await this.courseRepository.findOneBy({ id });
        if (!course) {
            return { message: 'Curso não encontrado' } as any;
        }

        await this.courseRepository.delete(course);
        return {message: 'Curso removido com sucesso'} as any;
    }
}

