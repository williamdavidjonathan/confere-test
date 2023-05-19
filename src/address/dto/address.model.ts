import { ApiProperty } from '@nestjs/swagger';

export class NewAddress {
  @ApiProperty({ example: 1, description: 'Identificador unico do endereço.' })
  id: number;

  @ApiProperty({ example: 1, description: 'Identificador unico do cliente.' })
  client_id: number;

  @ApiProperty({ example: 'John', description: 'Titulo do endereco.' })
  titulo: string;

  @ApiProperty({
    example: '72020-070',
    description: 'CEP do endereço.',
  })
  cep: string;

  @ApiProperty({
    example: 'Rua, Avenida, Servidão',
    description: '---- Auto completa ----. Logradouro do endereço.',
    required: false,
  })
  logradouro: string;

  @ApiProperty({ example: 194, description: 'Número do endereço.' })
  numero: string;

  @ApiProperty({
    example: 'Apto, Andar, Edifí[cil',
    description: 'Complemento do endereço, opcional.',
    required: false,
  })
  complemento?: string;

  @ApiProperty({
    example: 'Bairro X',
    description: '---- Auto completa ----. Bairro do endereço.',
    required: false,
  })
  bairro: string;

  @ApiProperty({
    example: 'Brasília',
    description: '---- Auto completa ----. Cidade do endereço.',
    required: false,
  })
  cidade: string;

  @ApiProperty({
    example: 'Distrito Federal',
    description: '---- Auto completa ----. Estado do endereço.',
    required: false,
  })
  estado: string;
}

export class ResponseAddress {
  @ApiProperty({ example: 1, description: 'Identificador unico do endereço.' })
  id: number;

  @ApiProperty({ example: 1, description: 'Identificador unico do cliente.' })
  client_id: number;

  @ApiProperty({ example: 'John', description: 'Titulo do endereco.' })
  titulo: string;

  @ApiProperty({
    example: '72020-070',
    description: 'CEP do endereço.',
  })
  cep: string;

  @ApiProperty({
    example: 'Rua, Avenida, Servidão',
    description: '---- Auto completa ----. Logradouro do endereço.',
    required: false,
  })
  logradouro: string;

  @ApiProperty({ example: 194, description: 'Número do endereço.' })
  numero: string;

  @ApiProperty({
    example: 'Apto, Andar, Edifí[cil',
    description: 'Complemento do endereço, opcional.',
    required: false,
  })
  complemento?: string;

  @ApiProperty({
    example: 'Bairro X',
    description: '---- Auto completa ----. Bairro do endereço.',
    required: false,
  })
  bairro: string;

  @ApiProperty({
    example: 'Brasília',
    description: '---- Auto completa ----. Cidade do endereço.',
    required: false,
  })
  cidade: string;

  @ApiProperty({
    example: 'Distrito Federal',
    description: '---- Auto completa ----. Estado do endereço.',
    required: false,
  })
  estado: string;

  @ApiProperty({
    example: 'Alex',
    description:
      'Presente na resposta. Nome do cliente responsável pelo endereço',
    required: false,
  })
  nome_do_cliente: string;

  @ApiProperty({
    example: 'alex@teste.com',
    description:
      'Presente na resposta. Email do cliente responsável pelo endereço',
    required: false,
  })
  email_do_cliente: string;
}

export class ResponseAddressGetBy {
  @ApiProperty({ example: 1, description: 'Identificador unico do endereço.' })
  id: number;

  @ApiProperty({ example: 1, description: 'Identificador unico do cliente.' })
  client_id: number;

  @ApiProperty({ example: 'John', description: 'Titulo do endereco.' })
  titulo: string;

  @ApiProperty({
    example: '72020-070',
    description: 'CEP do endereço.',
  })
  cep: string;

  @ApiProperty({
    example: 'Rua, Avenida, Servidão',
    description: '---- Auto completa ----. Logradouro do endereço.',
    required: false,
  })
  logradouro: string;

  @ApiProperty({ example: 194, description: 'Número do endereço.' })
  numero: string;

  @ApiProperty({
    example: 'Apto, Andar, Edifí[cil',
    description: 'Complemento do endereço, opcional.',
    required: false,
  })
  complemento?: string;

  @ApiProperty({
    example: 'Bairro X',
    description: '---- Auto completa ----. Bairro do endereço.',
    required: false,
  })
  bairro: string;

  @ApiProperty({
    example: 'Brasília',
    description: '---- Auto completa ----. Cidade do endereço.',
    required: false,
  })
  cidade: string;

  @ApiProperty({
    example: 'Distrito Federal',
    description: '---- Auto completa ----. Estado do endereço.',
    required: false,
  })
  estado: string;

  @ApiProperty({
    example: 'Alex',
    description:
      'Presente na resposta. Nome do cliente responsável pelo endereço',
    required: false,
  })
  nome_do_cliente: string;

  @ApiProperty({
    example: 'alex@teste.com',
    description:
      'Presente na resposta. Email do cliente responsável pelo endereço',
    required: false,
  })
  email_do_cliente: string;
}
