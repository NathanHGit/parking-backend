import { Controller, Body, Get, Param, Patch } from '@nestjs/common';

import { ParkingService } from './parking.service';
import { ReservationService } from 'src/reservation/reservation.service';

@Controller('parking')
export class ParkingController {
  constructor(
    private readonly parkingService: ParkingService,
    private readonly reservationService: ReservationService,
  ) {}

  /**
   * Retrieves all parking spots.
   * @returns A promise that resolves to an array of parking spots.
   */
  @Get()
  async getAllSpots() {
    return await this.parkingService.getSpots();
  }

  /**
   * Updates the state of a parking spot.
   * @param id The ID of the parking spot to update.
   * @param occupied The new occupancy state of the parking spot.
   */
  @Patch(':id')
  async updateSpot(
    @Param('id') id: string,
    @Body('occupied') occupied: boolean,
  ) {
    const isSpotBooked = await this.reservationService.isBooked(id);
    const spot = await this.parkingService.getSpotById(id);
    if (isSpotBooked && spot.occupied === occupied) {
      return false;
    }
    this.parkingService.changeSpotState(id, occupied);
    return true;
  }
}
