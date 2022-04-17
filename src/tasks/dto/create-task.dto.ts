import {IsNotEmpty, isNotEmpty} from 'class-validator'

export class CreateTaskDTO{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}