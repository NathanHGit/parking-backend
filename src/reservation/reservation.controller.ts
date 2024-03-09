import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Param,
  Query,
} from '@nestjs/common';

import { ReservationService } from './reservation.service';

/**
 * Controller responsible for handling reservation-related requests.
 */
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  /**
   * Retrieves the reservation for a specific user.
   * @param {string} user - The ID of the user.
   * @returns {Promise<any>} A promise that resolves to the user's reservation.
   */
  @Get()
  async getUserReservation(@Query('user') user: string) {
    return await this.reservationService.getUserReservation(user);
  }

  /**
   * Adds a new reservation.
   * @param {string} user - The ID of the user making the reservation.
   * @param {string} spot - The ID of the parking spot being reserved.
   * @param {string} date - The date of the reservation.
   * @param {string} email - The email of the user making the reservation.
   * @returns {Promise<{ id: string }>} A promise that resolves to an object containing the ID of the newly created reservation.
   */
  @Post()
  async addReservation(
    @Body('user') user: string,
    @Body('spot') spot: string,
    @Body('date') date: string,
    @Body('email') email: string,
  ) {
    const generatedId = await this.reservationService.addReservation(
      user,
      spot,
      date,
      email,
    );
    return { id: generatedId };
  }

  /**
   * Deletes a reservation by its ID.
   * @param {string} id - The ID of the reservation to delete.
   */
  @Delete(':id')
  async deleteReservation(@Param('id') id: string) {
    this.reservationService.deleteReservation(id);
  }
}
