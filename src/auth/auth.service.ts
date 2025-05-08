import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { TokenPayload } from './entities/token.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Roles } from 'src/users/enums/roles.enum';
import { ResendService } from 'src/resend/resend.service';
import { clearConfigCache } from 'prettier';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private resendService: ResendService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.comparePasswords(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    // Check if user with this email already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(registerDto.password);

    // Create new user
    const newUser = await this.usersService.create({
      ...registerDto,
      role: Roles.Student,
      password: hashedPassword,
    });

    // Generate JWT token
    const payload: TokenPayload = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        profilePicture: newUser.profilePicture,
        bio: newUser.bio,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user profile
    const updatedUser = await this.usersService.update(userId, updateProfileDto);

    // Return updated user without password
    const { password, ...result } = updatedUser;
    return result;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.usersService.findById(userId);

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    if (newPassword.length < 6) {
      throw new BadRequestException('New password must be at least 6 characters long');
    }

    if (newPassword === currentPassword) {
      throw new BadRequestException('New password cannot be the same as the current password');
    }

    // Hash and save new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.update(userId, { password: hashedPassword });
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      // Don't reveal if user doesn't exist for security
      return;
    }

    // Create reset token (expires in 1 hour)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await this.usersService.setPasswordResetToken(user.id, token, expiresAt);

    // Send email
    await this.resendService.sendPasswordResetEmail(user.name, user.email, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findByPasswordResetToken(token);

    if (!user || !user.passwordResetToken || (user.passwordResetExpires && user.passwordResetExpires < new Date())) {
      throw new BadRequestException('Token de recuperación inválido o expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePassword(user.id, hashedPassword);

    // Invalidate token
    await this.usersService.clearPasswordResetToken(user.id);
  }
}