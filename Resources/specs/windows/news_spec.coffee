require('../helpers/SpecHelper');

describe("Windows/News", () ->
  view_proxy = null
  fb_news = Factory('fb_news', {name: 'some name', created_time: '2012-09-07T20:26:48+0000'})
  tweet = Factory('tweet', {text: 'some tweet', created_at: '2012-09-07T20:25:48+0000'})
  
  beforeEach(() ->
    spyOn(Windows, 'FbNewsDetail').andCallThrough()
    spyOn(Windows, 'TwitterNewsDetail').andCallThrough()
    spyOn(FbGraph, 'getNewsFeed').andCallFake((uid, cb) -> cb([fb_news]))
    spyOn(Twitter, 'timeline').andCallFake((str, cb)-> cb([tweet]))
    view_proxy = Windows.News()
    view_proxy.win.open()
    view_proxy.win.fireEvent('focus')
  )
  
  it('only gets news after a certain amount of cache time', () ->
    PropertyCache.setup({cache_time: 10000});
    view_proxy.win.fireEvent('focus')
    expect(FbGraph.getNewsFeed.callCount).toEqual(1)
    expect(Twitter.timeline.callCount).toEqual(1)
    PropertyCache.setup({cache_time: 1});
    sleep(10)
    view_proxy.win.fireEvent('focus')
    expect(FbGraph.getNewsFeed.callCount).toEqual(2)
    expect(Twitter.timeline.callCount).toEqual(2)
  )
    
  it('populates the table with sorted news', () ->
    expect(view_proxy.table.children.length).toEqual(2);
    expect(view_proxy.table.children[0].news).toEqual(tweet);
    expect(view_proxy.table.children[1].news).toEqual(fb_news);
  )
  
  it('takes you to the correct news detail page when you click the table', () ->
    view_proxy.table.fireEvent('click', {row: view_proxy.table.children[1]});
    expect(Windows.FbNewsDetail).toHaveBeenCalledWith(fb_news);
    view_proxy.table.fireEvent('click', {row: view_proxy.table.children[0]});
    expect(Windows.TwitterNewsDetail).toHaveBeenCalledWith(tweet);
  )
)
