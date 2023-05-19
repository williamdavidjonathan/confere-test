import { Module } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

import * as dotenv from 'dotenv';

dotenv.config();

console.log(`
  host: ${process.env.DB_HOST},
  port: ${parseInt(process.env.DB_PORT)},
  user: ${process.env.DB_USER},
  password: ${process.env.DB_PASSWORD},
  database: ${process.env.DB_NAME},
`);

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const connection = await createConnection({
          host: 'localhost',
          port: 3306,
          user: 'root',
          password: 'willian123',
          database: 'confere',
          namedPlaceholders: true, // Enable named placeholders
        });
        return connection;
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
