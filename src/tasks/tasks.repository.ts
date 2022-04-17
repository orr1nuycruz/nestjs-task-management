import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        
        if(status){
            query.andWhere('task.status = :status', {status})
        }
        const tasks = await query.getMany();
        if(search){
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
            {search: `%${search}%`})
        }

        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        const {title, description} = createTaskDto
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        });

        await this.save(task);
        return task;
    }
}