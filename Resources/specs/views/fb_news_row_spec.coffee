require('../helpers/SpecHelper');

describe("Views/FbNewsRow", () ->
  view_proxy = null
  fb_news = Factory('fb_news', {name: 'some name', created_time: '2012-09-07T20:26:48+0000'})
  
  beforeEach(() ->
    view_proxy = Views.FbNewsRow(fb_news)
  )
    
  it('has a label with the name in it', () ->
    log(fb_news)
    expect(view_proxy.title.text).toEqual('some name')
  )
  
  it('adds the picture icon', () ->
    expect(view_proxy.photo.image).toEqual(fb_news.picture)
  )
    
)
