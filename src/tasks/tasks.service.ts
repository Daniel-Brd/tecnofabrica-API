import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = this.taskRepository.create(createTaskDto);
      await this.taskRepository.save(newTask);
      return newTask;
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findAll() {
    try {
      const tasks = await this.taskRepository.find();

      if (!tasks) {
        throw new HttpException('Tasks not found.', 404);
      }

      return tasks;
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async findById(id: string) {
    try {
      const task = await this.taskRepository.findOne({
        where: { id },
      });

      if (!task) {
        throw new HttpException('Task not found.', 404);
      }

      return task;
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      await this.findById(id);

      const tempAffected = this.taskRepository.create(updateTaskDto);

      const affected = await this.taskRepository.update(id, tempAffected);

      if (!affected) {
        throw new HttpException('Something went wrong with update.', 400);
      }

      return await this.findById(id);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }

  async remove(id: string) {
    try {
      const task = await this.findById(id);

      if (!task) {
        throw new HttpException('Task not found', 404);
      }

      await this.taskRepository.delete({ id });

      return {
        message: 'Task deleted successfully',
        // deleted: task, -- use this if you want to show the deleted task
      };
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }
}
