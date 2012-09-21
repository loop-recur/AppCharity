require('../helpers/SpecHelper');

describe("Windows/About", () ->
  view_proxy = null
  fb_page = Factory('fb_page')
  
  beforeEach(() ->
    spyOn(FbGraph, 'getPage').andCallFake((uid, cb) -> cb(fb_page))
    spyOn(Twitter, 'tweet').andCallFake((cb) -> cb({success: true}))
    spyOn(FbGraph, 'wallPost').andCallFake((cb) -> cb({success: true}))
    view_proxy = Windows.About()
    view_proxy.win.open()
    view_proxy.win.fireEvent('focus')
  )
  
  it('only gets the page after a certain amount of cache time', () ->
    PropertyCache.setup({cache_time: 10000});
    view_proxy.win.fireEvent('focus')
    expect(FbGraph.getPage.callCount).toEqual(1)
    PropertyCache.setup({cache_time: 1});
    sleep(10)
    view_proxy.win.fireEvent('focus')
    expect(FbGraph.getPage.callCount).toEqual(2)
  )
  
  it('doesnt put the page on there twice', () ->
    PropertyCache.setup({cache_time: 1});
    original_amount_of_elements_on_screen = view_proxy.win.children.length
    sleep(10)
    view_proxy.win.fireEvent('focus')
    expect(view_proxy.win.children.length).toEqual(original_amount_of_elements_on_screen)
  )
  
  it("puts photo on the page", () ->
    expect(view_proxy.detail.photo.image).toEqual("http://sphotos-a.xx.fbcdn.net/hphotos-prn1/s720x720/551712_10151022751997385_326242902_n.jpg");
  )
  
  it("puts about on the page", () ->
    expect(view_proxy.detail.about.text).toMatch("Doctors Without Borders/Médecins Sans Frontières");
  )
  
  it("puts overview on the page", () ->
    expect(view_proxy.detail.overview.text).toMatch('MSF is an international medical humanitarian organization');
  )
  
  it("puts mission on the page", () ->
    expect(view_proxy.detail.mission.text).toMatch('Page Guidelines');
  )
  
  it("adds a tweet button to the page", () ->
    view_proxy.detail.tweet_button.fireEvent('click')
    expect(Twitter.tweet).toHaveBeenCalled()
  )
  
  it("adds a fb share button to the page", () ->
    view_proxy.detail.fb_button.fireEvent('click')
    expect(FbGraph.wallPost).toHaveBeenCalled()
  )
  
)
