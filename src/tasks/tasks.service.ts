import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private tasksRepository: TaskRepository,
        ) {}
    // private tasks: Task[] = [];

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        return  this.tasksRepository.getTasks(filterDto);
    }
    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }
    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter((task)=> task.status = status);
    //     }
    //     if(search){
    //         tasks = tasks.filter((task) =>{
    //             if (task.title.includes(search) || task.description.includes(search)){
    //                 return true
    //             }
    //             return false;
    //         })
    //     }
    //     return tasks
    // }

    async getTaskById(id : string): Promise<Task>{
        const found = await this.tasksRepository.findOne(id)
        if(!found){
            throw new NotFoundException(`Task with ID: "${id}" not found`)
        }
        return found;
    }
    // getTaskById(id: string): Task{
    //     const found = this.tasks.find((task) => task.id === id);
    //     if(!found){
    //         throw new NotFoundException(`where you at? "${id}"`);
    //     }
    //     return found;
    // }


    createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }
    // // createTask(title: string, description: string): Task {
    // createTask(createTaskDto: CreateTaskDTO): Task {
    //     const {title, description} = createTaskDto
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    async deleteTask(id: string): Promise<void>{
        const result = await this.tasksRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException("task not found")
        }
        console.log(result);
    } 
    // deleteTask(id: string): void{
    //     const found = this.getTaskById(id);
    //     this.tasks= this.tasks.filter((task)=> task.id !== found.id);
    // }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task); 
        return task;
    }
    // updateTaskStatus(id: string, status: TaskStatus){
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }


}
