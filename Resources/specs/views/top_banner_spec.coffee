require('../../specs/helpers/spec_helper')

TopBanner = nrequire('templates/views/top_banner')

describe("Views/TopBanner", () ->
  view_proxy = null
  
  beforeEach(() ->
    spyOn(Ti.Platform, 'openURL').andCallThrough()
    view_proxy = TopBanner.render()
  )
    
  it('opens up donate link', () ->
    view_proxy.donate_button.fireEvent('click')
    expect(Ti.Platform.openURL).toHaveBeenCalled()
  )
  
  it('adds the blurb only if its ipad', () ->
    expect(view_proxy.view.children.length).toEqual(2)
    SpecHelper.switchPlatform('IPad', true)
    expect(TopBanner.render().view.children.length).toEqual(3)
    SpecHelper.switchPlatform('IPad', false)
  )
)
