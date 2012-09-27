require('../helpers/SpecHelper');

describe("Views/TopBanner", () ->
  view_proxy = null
  
  beforeEach(() ->
    spyOn(Ti.Platform, 'openURL').andCallThrough()
    view_proxy = Views.TopBanner()
  )
    
  it('opens up donate link', () ->
    view_proxy.donate_button.fireEvent('click')
    expect(Ti.Platform.openURL).toHaveBeenCalled()
  )
)
