import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingModule } from './parking/parking.module';
import { ReservationModule } from './reservation/reservation.module';

require('dotenv').config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

@Module({
  imports: [
    ParkingModule,
    ReservationModule,
    MongooseModule.forRoot(
      `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
