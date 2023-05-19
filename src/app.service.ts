import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  convertDate(date: string): string {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (regex.test(date)) {
      return date.replace(regex, '$3-$2-$1');
    } else {
      throw new Error('Formato de data inválido');
    }
  }
}
