import House from '../House';
import { List } from 'immutable';

test('throws an error when trying to create house from bad object', () => {
  expect(() => House.createHouses([{bad: 'object'}])).toThrow();
});

test('creates a house', () => {
  const houses = House.createHouses([{
    latitude: 0,
    longitude: 1,
    price: 2,
  }]);

  expect(houses.first()).toMatchObject({
    _latitude: 0,
    _longitude: 1,
    _price: 2,
    _schools: List(),
    _libraries: List(),
    _culturalSpaces: List(),
    _parks: List(),
    _recreationalCenters: List(),
    _chargingStations: List(),
    _busStops: List()
  });
})
