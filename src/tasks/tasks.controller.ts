import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
      return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskbyId(@Param('id') id : string): Promise<Task>{
    return this.tasksService.getTaskById(id);
  }
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  @Post()
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskDto: CreateTaskDTO,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  // @Post()
  // createTask(
  //   // @Body('title') title: string,
  //   // @Body('description') description: string,
  //   @Body() createTaskDto: CreateTaskDTO,
  // ): Task {
  //   //   return this.tasksService.createTask(title, description);
  //   return this.tasksService.createTask(createTaskDto);
  // }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.tasksService.deleteTask(id);
  // }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task>{
      const {status}  = updateTaskStatusDto
      return this.tasksService.updateTaskStatus(id, status)
  }
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status') updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //     const {status}  = updateTaskStatusDto
  //     return this.tasksService.updateTaskStatus(id, status)
  // }
}
