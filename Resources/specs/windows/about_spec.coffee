require('../helpers/SpecHelper');

describe("Windows/About", () ->
  view_proxy = null
  detail_view_proxy = null
  
  beforeEach(() ->
    spyOn(Twitter, 'tweet').andCallFake((cb) -> cb({success: true}))
    view_proxy = Windows.About()
    detail_view_proxy = view_proxy.detail_view_proxy; 
    view_proxy.win.open()
    view_proxy.win.fireEvent('focus')
  )
  
  # it('only gets the page after a certain amount of cache time', () ->
  #   PropertyCache.setup({cache_time: 10000});
  #   view_proxy.win.fireEvent('focus')
  #   PropertyCache.setup({cache_time: 1});
  #   sleep(10)
  #   view_proxy.win.fireEvent('focus')
  # )

  
  it("puts photo on the page", () ->
    expect(detail_view_proxy.photo.image).toEqual("http://sphotos-a.xx.fbcdn.net/hphotos-prn1/s720x720/551712_10151022751997385_326242902_n.jpg");
  )
  
  it("puts content from ACS on the page", () ->
    expect(detail_view_proxy.content.text).toMatch('Content from ACS key here.');
  )
  
  it("puts title from ACS on the page", () ->
    expect(detail_view_proxy.title.text).toMatch('Title from ACS key here.');
  )
  
  it("puts an imageView with an image from ACS on the page", () ->
    expect(detail_view_proxy.photo.image).toMatch('http://acs.com/special_image_url.jpg');
  )
    
  it("adds a tweet button to the page", () ->
    detail_view_proxy.tweet_button.fireEvent('click')
    expect(Twitter.tweet).toHaveBeenCalled()
  )
  
  it("adds a fb share button to the page", () ->
    detail_view_proxy.fb_button.fireEvent('click')
    # Not sure how this should work now. -eric
    # expect(FbGraph.wallPost).toHaveBeenCalled()
  )
  
  describe("Subpages", () ->
    
    describe("When additional pages exist in ACS", () ->

      it("has the first item in the submenu as the 'about us' subnav item", () ->
        expect(view_proxy.submenu.nav_entries[0].title).toMatch('About Us') 
      )
      
      it("adds 3 submenu items to the view", () ->
        expect(view_proxy.submenu.nav_entries.length).toEqual(3) 
      )

      it("shows subpage header images", () ->

      )

    )

    describe("When no other subpages exist in ACS", () ->

      it("shows no subpage headers", () ->
      )
      
    )
    
  )
  
)
