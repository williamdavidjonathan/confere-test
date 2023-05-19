import { IsString, IsEmail, IsArray } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  nome: string;

  @IsString()
  duracao: string;

  @IsEmail()
  ponto_inicial: string;

  @IsArray()
  enderecos: [];
}
