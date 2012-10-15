

describe("Views/EventRow", () ->
  view_proxy = null
  event = Factory('fb_event', {name: "Event name"})
  
  beforeEach(() ->
    view_proxy = Views.EventRow(event)
  )
    
  it('has a label with the title in it', () ->
    expect(view_proxy.title.text).toEqual('Event name');
  )
)
