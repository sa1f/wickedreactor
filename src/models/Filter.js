// @flow
'use strict'

export default class Filter {
  _filter: Filter;

  _minimumLatitude: number;
  _maximumLatitude: number;
  _minimumLongitude: number;
  _maximumLongitude: number;
  _schoolRange: number;
  _libraryRange: number;
  _culturalSpaceRange: number;
  _parkRange: number;
  _recreationalCenterRange: number;
  _chargingStationRange: number;
  _busStopRange: number;

  getFilter(): Filter {
    if (!this._filter) {
      this._filter = new Filter();
    }

    return this._filter;
  }

  setMinimumLatitude(latitude: number): this {
    this._minimumLatitude = latitude;
    return this;
  }

  setMaximumLatitude(latitude: number): this {
    this._maximumLatitude = latitude;
    return this;
  }

  setMinimumLongitude(longitude: number): this {
    this._minimumLongitude = longitude;
    return this;
  }

  setMaximumLongitude(longitude: number): this {
    this._minimumLongitude = longitude;
    return this;
  }

  setSchoolRange(schoolRange: number): this {
    this._schoolRange = schoolRange;
    return this;
  }

  setLibraryRange(libraryRange: number): this {
    this._libraryRange = libraryRange;
    return this;
  }

  setCulturalSpaceRange(culturalSpaceRange: number): this {
    this._culturalSpaceRange = culturalSpaceRange;
    return this;
  }

  setParkRange(parkRange: number): this {
    this._parkRange = parkRange;
    return this;
  }

  setRecreationalCenterRange(recreationalCenterRange: number): this {
    this._recreationalCenterRange = recreationalCenterRange;
    return this;
  }

  setChargingStationRange(chargingStationRange: number): this {
    this._chargingStationRange = chargingStationRange;
    return this;
  }

  setBusStopRange(busStopRange: number): this {
    this._busStopRange = busStopRange;
    return this;
  }
}
