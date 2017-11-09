import Filter from '../Filter';

test('returns singleton', () => {
  expect(Filter.getFilter()).toBe(Filter.getFilter());
});

test('returns json blob of Filter properties', () => {
  let properyValue = 1;
  const filter = Filter.getFilter()
    .setMinimumLatitude(properyValue++)
    .setMaximumLatitude(properyValue++)
    .setMinimumLongitude(properyValue++)
    .setMaximumLongitude(properyValue++)
    .setSchoolRange(properyValue++)
    .setLibraryRange(properyValue++)
    .setCulturalSpaceRange(properyValue++)
    .setParkRange(properyValue++)
    .setRecreationalCenterRange(properyValue++)
    .setChargingStationRange(properyValue++)
    .setBusStopRange(properyValue++);
  const filterJson = filter.toJSON();

  properyValue = 1;
  expect(filterJson).toMatchObject({
    minimumLatitude: properyValue++,
    maximumLatitude: properyValue++,
    minimumLongitude: properyValue++,
    maximumLongitude: properyValue++,
    schoolRange: properyValue++,
    libraryRange: properyValue++,
    culturalSpaceRange: properyValue++,
    parkRange: properyValue++,
    recreationalCenterRange: properyValue++,
    chargingStationRange: properyValue++,
    busStopRange: properyValue++,
  });
})
