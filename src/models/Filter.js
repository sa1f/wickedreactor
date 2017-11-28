// @flow
'use strict';

import House from './House';
import { List } from 'immutable';

export type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
};

export default class Filter {
  static _filter: Filter;

  _minimumPrice: number = 1000000;
  _maximumPrice: number = 5000000;
  _minimumLatitude: number = 49;
  _maximumLatitude: number = 50;
  _minimumLongitude: number = -124;
  _maximumLongitude: number = -123;
  _schoolRange: number = 1;
  _libraryRange: number = 1;
  _culturalSpaceRange: number = 1;
  _parkRange: number = 1;
  _recreationalCenterRange: number = 1;
  _chargingStationRange: number = 1;
  _busStopRange: number = 1;

  static getFilter(): Filter {
    if (!this._filter) {
      this._filter = new Filter();
    }

    return this._filter;
  }

  async genHouses(): Promise<List<House>> {
    console.log(JSON.stringify(Filter.getFilter()));

    const response = await fetch(new Request(
      'https://hospitable-vise.glitch.me/',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify(Filter.getFilter()),
      }));

    const responseJson = await response.json();
    return House.createHouses(responseJson);
  }

  setRegion(region: Region): this {
    return this.setMinimumLatitude(region.latitude - region.latitudeDelta)
      .setMaximumLatitude(region.latitude + region.latitudeDelta)
      .setMinimumLongitude(region.longitude - region.longitudeDelta)
      .setMaximumLongitude(region.longitude + region.longitudeDelta);
  }

  getMinimumPrice(): number {
    return this._minimumPrice;
  }

  setMinimumPrice(price: number): this {
    this._minimumPrice = price;
    return this;
  }

  getMaximumPrice(): number {
    return this._maximumPrice;
  }

  setMaximumPrice(price: number): this {
    this._maximumPrice = price;
    return this;
  }

  getMinimumLatitude(): number {
    return this._minimumLatitude;
  }

  setMinimumLatitude(latitude: number): this {
    this._minimumLatitude = latitude;
    return this;
  }

  getMaximumLatitude(): number {
    return this._maximumLatitude;
  }

  setMaximumLatitude(latitude: number): this {
    this._maximumLatitude = latitude;
    return this;
  }

  getMinimumLongitude(): number {
    return this._minimumLongitude;
  }

  setMinimumLongitude(longitude: number): this {
    this._minimumLongitude = longitude;
    return this;
  }

  getMaximumLongitude(): number {
    return this._maximumLongitude;
  }

  setMaximumLongitude(longitude: number): this {
    this._maximumLongitude = longitude;
    return this;
  }

  getSchoolRange(): number {
    return this._schoolRange;
  }

  setSchoolRange(schoolRange: number): this {
    this._schoolRange = schoolRange;
    return this;
  }

  getLibraryRange(): number {
    return this._libraryRange;
  }

  setLibraryRange(libraryRange: number): this {
    this._libraryRange = libraryRange;
    return this;
  }

  getCulturalSpaceRange(): number {
    return this._culturalSpaceRange;
  }

  setCulturalSpaceRange(culturalSpaceRange: number): this {
    this._culturalSpaceRange = culturalSpaceRange;
    return this;
  }

  getParkRange(): number {
    return this._parkRange;
  }

  setParkRange(parkRange: number): this {
    this._parkRange = parkRange;
    return this;
  }

  getRecreationalCenterRange(): number {
    return this._recreationalCenterRange;
  }

  setRecreationalCenterRange(recreationalCenterRange: number): this {
    this._recreationalCenterRange = recreationalCenterRange;
    return this;
  }

  getChargingStationRange(): number {
    return this._chargingStationRange;
  }

  setChargingStationRange(chargingStationRange: number): this {
    this._chargingStationRange = chargingStationRange;
    return this;
  }

  getBusStopRange(): number {
    return this._busStopRange;
  }

  setBusStopRange(busStopRange: number): this {
    this._busStopRange = busStopRange;
    return this;
  }

  toJSON(): Object {
    return {
      minimumLatitude: this._minimumLatitude,
      maximumLatitude: this._maximumLatitude,
      minimumLongitude: this._minimumLongitude,
      maximumLongitude: this._maximumLongitude,
      minimumPrice: this._minimumPrice,
      maximumPrice: this._maximumPrice,
      schoolRange: this._schoolRange,
      libraryRange: this._libraryRange,
      culturalSpaceRange: this._culturalSpaceRange,
      parkRange: this._parkRange,
      recreationalCenterRange: this._recreationalCenterRange,
      chargingStationRange: this._chargingStationRange,
      busStopRange: this._busStopRange,
    };
  }
}
