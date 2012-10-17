PropertyCache = nrequire('/lib/property_cache');

describe("PropertyCache", () ->
  beforeEach(()->
    PropertyCache.setup({cache_time: 10000})
    PropertyCache.set('abcs', {a: 1, b: 2, c: 3})
  )
      
  it('retreives the data', () ->
    response = PropertyCache.get('abcs', (data) ->
      expect(data.a).toEqual(1)
      expect(data.b).toEqual(2)
    )
    expect(response).toBeTruthy()
  )
  
  it('doesnt return the data if its been too long', ()->
    PropertyCache.setup({cache_time: 1})
    sleep(10)
    spy = jasmine.createSpy("dataCallback")
    response = PropertyCache.get('abcs', spy)
    expect(spy).not.toHaveBeenCalled()
    expect(response).toBeFalsy()
  )
   
)
