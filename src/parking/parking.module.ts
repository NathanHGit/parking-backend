import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { SpotSchema } from './spot.model';
import { ReservationService } from 'src/reservation/reservation.service';
import { ReservationSchema } from 'src/reservation/reservation.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Spot', schema: SpotSchema }]),
    MongooseModule.forFeature([
      { name: 'Reservation', schema: ReservationSchema },
    ]),
  ],
  controllers: [ParkingController],
  providers: [ParkingService, ReservationService],
})
export class ParkingModule {}
