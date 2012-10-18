require('../../specs/helpers/spec_helper')

EventRow = nrequire('/templates/views/event_row')

describe("Views/EventRow", () ->
  view_proxy = null
  event = Factory('fb_event', {name: "Event name"})
  
  beforeEach(() ->
    view_proxy = EventRow.render(event)
  )
    
  it('has a label with the title in it', () ->
    expect(view_proxy.title.text).toEqual('Event name')
  )
)
