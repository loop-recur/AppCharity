require('../helpers/SpecHelper');

describe("Windows/News", () ->
  view_proxy = null
  fb_page = Factory('fb_page')
  
  beforeEach(() ->
    spyOn(FbGraph, 'getPage').andCallFake((cb) -> cb(fb_page))
    spyOn(Twitter, 'tweet').andCallFake((cb) -> cb({success: true}))
    spyOn(FbGraph, 'wallPost').andCallFake((cb) -> cb({success: true}))
    view_proxy = Windows.About()
    view_proxy.win.open()
    view_proxy.win.fireEvent('focus')
  )
  
  it("gets information from fb", () ->
    expect(FbGraph.getPage).toHaveBeenCalled()
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
