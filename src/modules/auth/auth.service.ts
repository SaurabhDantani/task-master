import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import type { IUserRepository } from '../../infrastructure/interfaces/user-repository.interface.js';
import { USER_REPOSITORY } from '../../infrastructure/interfaces/user-repository.interface.js';
import { CommonResponse } from '../../common/responses/api-response.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface AuthTokens {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<CommonResponse> {
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    await this.userRepository.create(registerDto);

    return CommonResponse.success('User registered successfully');
  }

  async login(loginDto: LoginDto): Promise<CommonResponse> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      return CommonResponse.failure('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return CommonResponse.failure('Invalid credentials');
    }

    const payload = {
      loginId: user.id,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    return CommonResponse.successWithData('User logged in successfully', {
      accessToken,
    });
  }
}
