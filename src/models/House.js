// @flow
'use strict';

import { List } from 'immutable';

export type HouseData = {
  latitude: number,
  longitude: number,
  price: number,
  schools?: List<string>,
  libraries?: List<string>,
  culturalSpaces?: List<string>,
  parks?: List<string>,
  recreationalCenters?: List<string>,
  chargingStations?: List<string>,
  busStops?: List<string>,
};

export default class House {
  _latitude: number;
  _longitude: number;
  _address: string;
  _price: number;

  _schools: List<string>;
  _libraries: List<string>;
  _culturalSpaces: List<string>;
  _parks: List<string>;
  _recreationalCenters: List<string>;
  _chargingStations: List<string>;
  _busStops: List<string>;
  _photo: string;

  _schoolDistances: List<string>;
  _libraryDistances: List<string>;
  _culturalSpaceDistances: List<string>;
  _parkDistances: List<string>;
  _recreationalCenterDistances: List<string>;
  _chargingStationDistances: List<string>;

  constructor(house: HouseData) {
    this._latitude = house.latitude;
    this._longitude = house.longitude;
    this._address = house.address;
    this._price = house.price;
    this._schools = house.schools || List();
    this._libraries = house.libraries || List();
    this._culturalSpaces = house.culturalSpaces || List();
    this._parks = house.parks || List();
    this._recreationalCenters = house.recreationalCenters || List();
    this._chargingStations = house.chargingStations || List();
    this._busStops = house.busStops || List();
    this._photo = house.photo;
    this._schoolDistances = house.schoolDistances || List();
    this._libraryDistances = house.libraryDistances || List();
    this._culturalSpaceDistances = house.culturalSpaceDistances || List();
    this._parkDistances =  house.parkDistances || List();
    this._recreationalCenterDistances = house.recreationalCenterDistances || List();
    this._chargingStationDistances =  house.chargingStationDistances || List();
  }

  static createHouses(objects: List<Object> | Array<Object>): List<House> {
    return objects ?
      List(objects.map((object) =>
        new House(this._assertIsHouseData(object)),
      )) :
      List();
  }

  getLatitude(): number {
    return this._latitude;
  }

  getLongitude(): number {
    return this._longitude;
  }

  getAddress(): string {
    return this._address;
  }

  getPrice(): number {
    return this._price;
  }

  getSchools(): List<string> {
    return this._schools;
  }

  getLibraries(): List<string> {
    return this._libraries;
  }

  getCulturalSpaces(): List<string> {
    return this._culturalSpaces;
  }

  getParks(): List<string> {
    return this._parks;
  }

  getRecreationalCenters(): List<string> {
    return this._recreationalCenters;
  }

  getChargingStations(): List<string> {
    return this._chargingStations;
  }

  getPhoto(): string {
    return this._photo;
  }

  getSchoolDistances(): List<String> {
    return this._schoolDistances;
  }

  getLibraryDistances(): List<String> {
    return this._libraryDistances;
  }

  getCulturalSpaceDistances(): List<String> {
    return this._culturalSpaceDistances;
  }

  getParkDistances(): List<String> {
    return this._parkDistances;
  }

  getRecreationalCenterDistances(): List<String> {
    return this._recreationalCenterDistances;
  }

  getChargingStationDistances(): List<String> {
    return this._chargingStationDistances;
  }

  static _assertIsHouseData(object: Object): Object {
    const keys = Object.keys(object);

    if (!keys.includes("latitude") ||
      !keys.includes("longitude") ||
      !keys.includes("price")) {
      console.log(object);
      throw new TypeError();
    }

    object.latitude = parseFloat(object.latitude);
    object.longitude = parseFloat(object.longitude);
    object.price = this._formatPriceAsNumber(object.price);

    return object;
  }

  static _formatPriceAsNumber(price: string): number {
    return parseInt(price.replace(/\D/g, ''), 10);
  }
}
