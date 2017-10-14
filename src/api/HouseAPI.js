// @flow
'use strict'

import Filter from '../models/Filter';
import House from '../models/House';
import { List } from 'immutable';

export default class HouseAPI {
    static genHouses(): List<House> {
      return this._createHouses(fetch(new Request(
        'http://localhost/api',
        {
          method: 'GET',
          body: Filter.getFilter().toJSONString()
        }))
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson.houses;
        })
        .catch((error) => {
          console.error(error);
        }));
    }

    static _createHouses(objects: Array<Object>): List<House> {
      return List(objects.map(object =>
        new House(object),
      ));
    }
}
