import { Controller, Body, Get, Param, Patch } from '@nestjs/common';

import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

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
    this.parkingService.changeSpotState(id, occupied);
  }
}
