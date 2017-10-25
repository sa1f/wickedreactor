// @flow
'use strict'

import Filter from '../models/Filter';
import House from '../models/House';
import { List } from 'immutable';

export default class FilterAPI {
    static genHouses(): List<House> {
      return House.createHouses(fetch(new Request(
        'http://localhost/api',
        {
          method: 'GET',
          body:  JSON.stringify(Filter.getFilter())
        }))
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        }));
    }
}
