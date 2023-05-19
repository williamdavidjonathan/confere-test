import { ApiProperty } from '@nestjs/swagger';

export class NewRoute {
  @ApiProperty({ example: 1, description: 'Identificadar unico da rota.' })
  id: number;

  @ApiProperty({ example: 'Rota de entrega X', description: 'Nome da rota.' })
  nome: string;

  @ApiProperty({ example: '3 horas', description: 'Duração da rota.' })
  duracao: string;

  @ApiProperty({
    example: 'Asa sul',
    description: 'Ponto inicial da rota.',
  })
  ponto_inicial: string;

  @ApiProperty({
    example: '[1, 2, 3]',
    description: 'Ids do endereços da rota.',
  })
  enderecos: [];
}

export class ResponseRoute {
  @ApiProperty({ example: 1, description: 'Identificadar unico da rota.' })
  id: number;

  @ApiProperty({ example: 'Rota de entrega X', description: 'Nome da rota.' })
  nome: string;

  @ApiProperty({ example: '3 horas', description: 'Duração da rota.' })
  duracao: string;

  @ApiProperty({
    example: 'Asa sul',
    description: 'Ponto inicial da rota.',
  })
  ponto_inicial: string;
}

export class ResponseGetBy {
  @ApiProperty({ example: 1, description: 'Identificadar unico da rota.' })
  id: number;

  @ApiProperty({ example: 'Rota de entrega X', description: 'Nome da rota.' })
  nome: string;

  @ApiProperty({ example: '3 horas', description: 'Duração da rota.' })
  duracao: string;

  @ApiProperty({
    example: 'Asa sul',
    description: 'Ponto inicial da rota.',
  })
  ponto_inicial: string;

  @ApiProperty({ example: 1, description: 'Identificadar unico do cliente.' })
  client_id: number;

  @ApiProperty({ example: 'Casa de campo', description: 'Titulo do endereço.' })
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
    example: 'Apto, Andar, Edifícil',
    description: 'Complemento do endereço.',
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
    description: 'Cidade do endereço.',
    required: false,
  })
  cidade: string;

  @ApiProperty({
    example: 'DF',
    description: 'Estado do endereço.',
    required: false,
  })
  estado: string;
}

export class GetByIdResponse {
  @ApiProperty({ example: 1, description: 'Identificadar unico da rota.' })
  id: number;

  @ApiProperty({ example: 'Rota de entrega X', description: 'Nome da rota.' })
  nome: string;

  @ApiProperty({ example: '3 horas', description: 'Duração da rota.' })
  duracao: string;

  @ApiProperty({
    example: 'Asa sul',
    description: 'Ponto inicial da rota.',
  })
  ponto_inicial: string;
}
