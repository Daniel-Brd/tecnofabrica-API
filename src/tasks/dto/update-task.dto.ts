import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from 'src/enums/task-status.enum';


export class UpdateTaskDto {
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
