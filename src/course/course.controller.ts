import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateDto } from './dto/create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('course')
export class CourseController {
    constructor (private readonly courseService:CourseService){}

        @Get('/')
        findAll():any{
            return this.courseService.findAll();
        }

        @UseGuards(JwtAuthGuard)
        @Post('/')
        create(@Body()createdto:CreateDto){
            return this.courseService.create(createdto);
        }
       
        @UseGuards(JwtAuthGuard)
        @Put('/:id')
        update(@Body()updatedto:CreateDto, @Param('id')id:number){
            return this.courseService.update(id,updatedto);
        }

        @UseGuards(JwtAuthGuard)
        @Delete('/:id')
        remove( @Param('id')id:number){
            return this.courseService.remove(id);
        }
}