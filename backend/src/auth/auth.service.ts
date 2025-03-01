import { Injectable, UnauthorizedException, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}

  /**
   * Inscription d'un utilisateur avec vérification de l'email et du rôle
   */
  async signup(username: string, email: string, password: string, role: string, adminCode?: string) {
    // Vérifier si l'email ou le username existe déjà
    const existingUser = await this.usersService.findByEmailOrUsername(email, username);
    if (existingUser) throw new ConflictException('Email or Username already exists');

    // Vérifier le code admin si l'utilisateur veut s'inscrire en tant qu'admin
    if (role === 'admin') {
      const adminSecretCode = this.configService.get<string>('ADMIN_SECRET_CODE');
      if (adminCode !== adminSecretCode) throw new BadRequestException('Invalid admin code');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(username, email, hashedPassword, role);

    // Retourner un token JWT et le rôle
    return { 
      token: this.jwtService.sign({ id: user.id, role: user.role }),
      role: user.role
    };
  }

  /**
   * Connexion d'un utilisateur
   */
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Générer un token JWT
    return { 
      token: this.jwtService.sign({ id: user.id, role: user.role }),
      role: user.role
    };
  }

  /**
   * Demande de réinitialisation du mot de passe
   */
  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    // Générer un token de réinitialisation (UUID)
    const resetToken = uuidv4();
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Expire dans 1h

    // Sauvegarder le token dans la base de données
    await this.usersService.updateResetToken(user.id, resetToken, resetTokenExpiry);

    // Envoyer l'email de réinitialisation
    await this.emailService.sendResetPasswordEmail(email, resetToken);

    return { message: 'Password reset link sent to your email' };
  }

  /**
   * Réinitialisation du mot de passe avec un token valide
   */
  async resetPassword(token: string, newPassword: string) {
    const user = await this.usersService.findByResetToken(token);
    if (!user) throw new UnauthorizedException('Invalid or expired token');

    // Hasher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe et supprimer le token
    await this.usersService.updatePassword(user.id, hashedPassword);

    return { message: 'Password successfully reset' };
  }
}
