import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../database/entities/user.entity.js';
import { RegisterDto } from '../../modules/auth/dto/register.dto.js';
import { IUserRepository } from '../interfaces/user-repository.interface.js';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly ormRepository: Repository<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const user = this.ormRepository.create(registerDto);
    return this.ormRepository.save(user);
  }

  async findByEmail(
    email: string,
    options?: FindOneOptions<User>,
  ): Promise<User | null> {
    return this.ormRepository.findOne({
      where: { email },
      ...options,
    });
  }

  async findById(
    id: string,
    options?: FindOneOptions<User>,
  ): Promise<User | null> {
    return this.ormRepository.findOne({
      where: { id },
      ...options,
    });
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
