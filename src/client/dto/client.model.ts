import { ApiProperty } from '@nestjs/swagger';

export class Client {
  @ApiProperty({ example: 1, description: 'Identificador unico do cliente.' })
  id: number;

  @ApiProperty({ example: 'John', description: 'Nome do cliente.' })
  nome: string;

  @ApiProperty({ example: 'Doe', description: 'Sobrenome do cliente.' })
  sobrenome: string;

  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'Email do cliente.',
  })
  email: string;

  @ApiProperty({
    example: '15/07/1995',
    description: 'Data de nascimento do cliente.',
  })
  dataNascimento: string;

  @ApiProperty({
    example: '72020070',
    description: 'CEP residêncial do cliente.',
  })
  cep: string;

  @ApiProperty({
    example: 'Rua, Avenida, Servidão',
    description: 'Logradouro do endereço residêncial.',
    required: false,
  })
  logradouro: string;

  @ApiProperty({ example: 194, description: 'Número da residência.' })
  numeroDaResidencia: string;

  @ApiProperty({
    example: 'Apto, Andar, Edifí[cil',
    description: 'Complemento do endereço, opcional.',
    required: false,
  })
  complemento?: string;

  @ApiProperty({
    example: 'Bairro X',
    description: 'Bairro da residência.',
    required: false,
  })
  bairro: string;

  @ApiProperty({
    example: 'Brasília',
    description: 'Cidade da residência.',
    required: false,
  })
  cidade: string;

  @ApiProperty({
    example: 'Distrito Federal',
    description: 'Estado da residência.',
  })
  estado: string;
}
