import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Spot } from './spot.model';

@Injectable()
export class ParkingService {
  constructor(@InjectModel('Spot') private readonly spotModel: Model<Spot>) {}

  /**
   * Retrieves all parking spots.
   * @returns A promise that resolves to an array of Spot objects representing parking spots.
   */
  async getSpots() {
    const spots = await this.spotModel.find().exec();
    return spots as Spot[];
  }

  /**
   * Retrieves a parking spot by its ID.
   * @param id The ID of the parking spot to retrieve.
   * @returns A promise that resolves to the Spot object representing the parking spot.
   */
  async getSpotById(id: string): Promise<Spot | null> {
    try {
      const spot = await this.spotModel.findById(id).exec();
      return spot;
    } catch (error) {
      throw new NotFoundException('Could not find spot.');
    }
  }

  /**
   * Changes the state of a parking spot.
   * @param id The ID of the parking spot to update.
   * @param occupied The new occupancy state of the parking spot.
   */
  async changeSpotState(id: string, occupied: boolean): Promise<void> {
    try {
      await this.spotModel.updateOne({ _id: id }, { occupied: occupied });
    } catch (error) {
      throw new NotFoundException('Could not find the spot.');
    }
  }
}
