import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Reservation } from './reservation.model';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel('Reservation')
    private readonly reservationModel: Model<Reservation>,
  ) {}

  /**
   * Retrieves a reservation for a specific user.
   * @param user The ID of the user.
   * @returns A promise that resolves to the reservation object.
   */
  async getUserReservation(user: string) {
    try {
      const reservation = await this.reservationModel
        .findOne({ user })
        .populate('spot')
        .exec();

      return reservation;
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
  }

  /**
   * Adds a new reservation.
   * @param user The ID of the user making the reservation.
   * @param spot The ID of the spot being reserved.
   * @param date The date of the reservation.
   * @param email The email of the user making the reservation.
   * @returns A promise that resolves to the ID of the newly created reservation.
   */
  async addReservation(
    user: string,
    spot: string,
    date: string,
    email: string,
  ) {
    const newReservation = new this.reservationModel({
      user,
      spot,
      date,
      email,
    });
    const result = await newReservation.save();
    return result.id as string;
  }

  /**
   * Deletes a reservation by its ID.
   * @param id The ID of the reservation to delete.
   */
  async deleteReservation(id: string) {
    await this.reservationModel.deleteOne({ _id: id }).exec();
  }
}
