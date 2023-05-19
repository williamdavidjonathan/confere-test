import {
  IsString,
  IsDateString,
  IsEmail,
  IsNumber,
  Matches,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  nome: string;

  @IsString()
  sobrenome: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dataNascimento: string;

  @IsString()
  @Matches(/^\d{5}(-\d{3})?$/, { message: 'Formato do cep inválido' })
  cep: string;

  @IsString()
  logradouro?: string;

  @IsNumber()
  numeroDaResidencia: number;

  @IsString()
  complemento?: string | null;

  @IsString()
  bairro?: string | null;

  @IsString()
  cidade?: string | null;

  @IsString()
  estado?: string | null;
}
