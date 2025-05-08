import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validateUniajcEmail } from 'src/common/utils/email-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    validateUniajcEmail(createUserDto.email);

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByPasswordResetToken(token: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: MoreThan(new Date())
      }
    });
  }

  async setPasswordResetToken(
    userId: number,
    token: string,
    expiresAt: Date
  ): Promise<void> {
    await this.usersRepository.update(userId, {
      passwordResetToken: token,
      passwordResetExpires: expiresAt
    });
  }

  async clearPasswordResetToken(userId: number): Promise<void> {
    await this.usersRepository.update(userId, {
      passwordResetToken: null,
      passwordResetExpires: null
    });
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    await this.usersRepository.update(userId, {
      password: newPassword,
      passwordResetToken: null,
      passwordResetExpires: null
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      validateUniajcEmail(updateUserDto.email);
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }
}