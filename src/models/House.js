// @flow
'use strict'

import { List } from 'immutable';

export default class House {
  _latitude: number;
  _longitude: number;
  _price: number;

  _schools: List<string>;
  _libraries: List<string>;
  _culturalSpaces: List<string>;
  _parks: List<string>;
  _recreationalCenters: List<string>;
  _chargingStations: List<string>;
  _busStops: List<string>;

  constructor(house: {
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
  }) {
    this._latitude = house.latitude;
    this._longitude = house.longitude;
    this._price = house.price;
    this._schools = house.schools || List();
    this._libraries = house.libraries || List();
    this._culturalSpaces = house.culturalSpaces || List();
    this._parks = house.parks || List();
    this._recreationalCenters = house.recreationalCenters || List();
    this._chargingStations = house.chargingStations || List();
    this._busStops = house.busStops || List();
  }

  getLatitude(): number {
    return this._latitude;
  }

  getLongitude(): number {
    return this._longitude;
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

  getBusStops(): List<string> {
    return this._busStops;
  }
}