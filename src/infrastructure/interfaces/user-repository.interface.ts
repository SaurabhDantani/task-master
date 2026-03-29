import { FindOneOptions } from 'typeorm';
import { User } from '../database/entities/user.entity.js';
import { RegisterDto } from '../../modules/auth/dto/register.dto.js';

/**
 * IUserRepository
 *
 * Defines the contract for all user persistence operations.
 * AuthService depends on this interface — not on TypeORM directly.
 */
export interface IUserRepository {
  create(registerDto: RegisterDto): Promise<User>;
  findByEmail(
    email: string,
    options?: FindOneOptions<User>,
  ): Promise<User | null>;
  findById(id: string, options?: FindOneOptions<User>): Promise<User | null>;
  save(user: User): Promise<User>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
