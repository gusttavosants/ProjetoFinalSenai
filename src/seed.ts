import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { Collaborator } from './collaborator/entity/collaborator.entity';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const collaboratorRepository = app.get('CollaboratorRepository');

  // Criar um colaborador de teste
  const email = 'admin@example.com';
  const senha = 'senha123';

  const exists = await collaboratorRepository.findOne({ where: { email } });

  if (exists) {
    console.log('Colaborador já existe');
    await app.close();
    return;
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  const collaborator = collaboratorRepository.create({
    nome: 'Administrador',
    email: email,
    senha: hashedPassword,
    ativo: true,
  });

  await collaboratorRepository.save(collaborator);
  console.log('Colaborador criado com sucesso!');
  console.log(`Email: ${email}`);
  console.log(`Senha: ${senha}`);

  await app.close();
}

seed().catch((err) => {
  console.error('Erro ao criar colaborador:', err);
  process.exit(1);
});
