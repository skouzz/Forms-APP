import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
    return this.userModel.findOne({ 
      $or: [{ email }, { username }]  
    }).exec();
  }

  async create(username: string, email: string, password: string, role: string): Promise<User> {
    const newUser = new this.userModel({ username, email, password, role });
    return newUser.save();
  }

  async updateResetToken(id: string, resetToken: string, resetTokenExpiry: Date): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { resetToken, resetTokenExpiry }).exec();
  }

  async findByResetToken(resetToken: string): Promise<User | null> {
    return this.userModel.findOne({ resetToken, resetTokenExpiry: { $gt: new Date() } }).exec();
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { password: newPassword, resetToken: null, resetTokenExpiry: null }).exec();
  }
}
