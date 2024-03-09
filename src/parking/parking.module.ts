import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { SpotSchema } from './spot.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Spot', schema: SpotSchema }])],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
