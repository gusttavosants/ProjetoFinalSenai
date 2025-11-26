import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Collaborator } from '../collaborator/entity/collaborator.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Collaborator)
    private collaboratorRepository: Repository<Collaborator>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senha: string): Promise<{ access_token: string; collaborator: any }> {
    const collaborator = await this.collaboratorRepository.findOne({
      where: { email },
    });

    if (!collaborator) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(senha, collaborator.senha);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    if (!collaborator.ativo) {
      throw new UnauthorizedException('Colaborador inativo');
    }

    const payload = { sub: collaborator.id, email: collaborator.email };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      collaborator: {
        id: collaborator.id,
        nome: collaborator.nome,
        email: collaborator.email,
      },
    };
  }

  async validateCollaborator(id: number): Promise<Collaborator> {
    const collaborator = await this.collaboratorRepository.findOne({
      where: { id },
    });

    if (!collaborator) {
      throw new UnauthorizedException('Colaborador não encontrado');
    }

    return collaborator;
  }
}
