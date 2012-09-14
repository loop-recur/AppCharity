require('../helpers/SpecHelper')
describe("Maps", () ->
  coords = null
  
  beforeEach(() ->
    coords = [{latitude : 39.478208, longitude : -106.045618},
               {latitude : 39.489701, longitude : -106.047206},
               {latitude : 39.531850, longitude : -106.039910},
               {latitude : 39.481189, longitude : -106.046433}]
  )
  
  it("finds the average max and min latitudes", ()->
      expect(Coords.averageCoordinate('latitude', coords)).toEqual(39.505029)
  )
  
  it("finds the average of the max and min longitude", () ->
    expect(Coords.averageCoordinate('longitude', coords)).toEqual(-106.043558)
  )
  
  describe("closestLocation", () ->    
    beforeEach(() ->
      current = {latitude : 39.531851, longitude : -106.039911}
      Geolocator = {getCurrentCoordinates: jasmine.createSpy().andCallFake((cb) -> cb(current) )}
    )
    
    it("finds the closest location", () ->
      Coords.closestLocation(((closest)-> expect(closest).toEqual(coords[2])), coords)
    )
  )
  
)