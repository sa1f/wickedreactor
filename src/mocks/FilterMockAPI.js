// @flow
'use strict';

import Filter from '../models/Filter';
import House from '../models/House';
import { List } from 'immutable';

export default class FilterMockAPI {
  static _houses: List<House> = List();

  static genHouses(): List<House> {
    const filter = Filter.getFilter();
    return this._getHouses().filter((houseData) =>
      houseData.getLatitude() > filter.getMinimumLatitude() &&
      houseData.getLatitude() < filter.getMaximumLatitude() &&
      houseData.getLongitude() > filter.getMinimumLongitude() &&
      houseData.getLongitude() < filter.getMaximumLongitude() &&
      houseData.getPrice() > filter.getMinimumPrice() &&
      houseData.getPrice() < filter.getMaximumPrice());
  }

  static _getHouses(): List<House> {
    if (this._houses.isEmpty()) {
      this._houses = this._createHousesRandomly();
    }

    return this._houses;
  }

  static _createHousesRandomly(): List<House> {
    let houseData = Array();

    for (let i = 0; i < 100; i++) {
      houseData.push({
        latitude: 49.2 + (Math.random() / 10),
        longitude: -123.1 - (Math.random() / 10),
        price: 10000000 * Math.random(),
      });
    }

    return House.createHouses(houseData);
  }
}
