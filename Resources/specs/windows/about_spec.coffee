require('../../specs/helpers/spec_helper')

FbGraph = nrequire('lib/fb_graph')
Twitter = nrequire('lib/twitter')
AboutWin = nrequire('/windows/about')
PropertyCache = nrequire('/lib/property_cache')

describe("Windows/About", () ->
  view_proxy = null
  detail_view = null
  about_page1 = null
  about_page2 = null
  
  beforeEach(() ->
    about_page1 = Factory('about_us_subpage')
    about_page2 = Factory('about_us_subpage', {title: "Mission"})
    spyOn(Cloud.Objects, 'query').andCallFake((query, cb) -> cb({success: true, AboutUsPage: [about_page1, about_page2]}))
    spyOn(Twitter, 'tweet').andCallFake((cb) -> cb({success: true}))
    spyOn(FbGraph, 'wallPost').andCallFake((cb) -> cb({success: true}))
    view_proxy = AboutWin()
    detail_view = view_proxy.detail_view
    PropertyCache.setup({cache_time: 10000})
    view_proxy.win.open()
    view_proxy.win.fireEvent('focus')
  )
  
  it('only gets the page after a certain amount of cache time', () ->
    view_proxy.win.fireEvent('focus')
    expect(Cloud.Objects.query.callCount).toEqual(1)
    PropertyCache.setup({cache_time: 1})
    sleep(10)
    view_proxy.win.fireEvent('focus')
    expect(Cloud.Objects.query.callCount).toEqual(2)
  )

  it("puts photo on the page", ()->
    expect(detail_view.photo.image).toEqual("http://storage.cloud.appcelerator.com/bx017YfidhbNRHRMlhZCTl4dOy8Ug9qH/photos/c1/ab/506c90c79e73795f3b000292/charity1_medium_640.jpeg")
  )
  
  it("puts content from ACS on the page", ()->
    expect(detail_view.content.text).toMatch('This is copy that we have for the About Us page.')
  )
  
  it("puts title from ACS on the page", ()->
    expect(detail_view.title.text).toMatch('About Us')
  )
    
  it("adds a tweet button to the page", ()->
    detail_view.tweet_button.fireEvent('click')
    expect(Twitter.tweet).toHaveBeenCalled()
  )
  
  it("adds a fb share button to the page", () ->
    detail_view.fb_button.fireEvent('click')
    expect(FbGraph.wallPost).toHaveBeenCalled()
  )
  
  it("changes the view when you click the subnav", ()->
    view_proxy.subnav.fireEvent('click', {source: {page: view_proxy.subnav.children[1].page, idx: 1}})
    expect(detail_view.title.text).toMatch("Mission")
  )
  
  it("evenly distributes the subnav", ()->
    expect(view_proxy.subnav.children[1].width).toEqual(160)
  )
  
  it("leaves the mask from the other subnav, but not the main", ()->
    expect(view_proxy.subnav.children[1].mask.opacity).toEqual(0.7)
    expect(view_proxy.subnav.children[0].mask.opacity).toEqual(0)
  )

  it('only shows 2 subnav items on first window focus', ()->
    expect(view_proxy.subnav.children.length).toEqual(2)
  )

  xit('it removes newlines from page content', ()->)
  
  xit('still only shows the original 2 subnav items on window focus and does not duplicate them each time the window is focused on', ()->
    view_proxy.win.fireEvent('focus')
    view_proxy.subnav.children.map((c)->
    )
    expect(view_proxy.subnav.children.length).toEqual(2)
  )
  
)
