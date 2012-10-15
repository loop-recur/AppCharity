

describe("Windows/Events", () ->
  view_proxy = null
  event1 = Factory('fb_event', {start_time: 1221004800})
  event2 = Factory('fb_event', {start_time: 1220630400})
  
  beforeEach(() ->
    spyOn(FbGraph, 'getEventsOlderThan2Weeks').andCallFake((id, uid, cb) -> cb([event1, event2]))
    spyOn(Windows, "EventDetail").andCallThrough()
    view_proxy = Windows.Events()
    view_proxy.win.open()
    view_proxy.win.fireEvent('focus')
  )
  
  it('only gets news after a certain amount of cache time', () ->
    PropertyCache.setup({cache_time: 10000});
    view_proxy.win.fireEvent('focus')
    expect(FbGraph.getEventsOlderThan2Weeks.callCount).toEqual(1)
    PropertyCache.setup({cache_time: 1});
    sleep(10)
    view_proxy.win.fireEvent('focus')
    expect(FbGraph.getEventsOlderThan2Weeks.callCount).toEqual(2)
  )
    
  it('populates the table with sorted events', () ->
    expect(view_proxy.table.children[0].event).toEqual(event2);
    expect(view_proxy.table.children[1].event).toEqual(event1);
  )
  
  it('takes you to the correct event detail page when you click the table', () ->
    view_proxy.table.fireEvent('click', {row: view_proxy.table.children[1]});
    expect(Windows.EventDetail).toHaveBeenCalledWith(event1);
  )
)
