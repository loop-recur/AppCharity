require('../../specs/helpers/spec_helper')

TwitterNewsRow = nrequire('templates/views/twitter_news_row')

describe("Views/TwitterNewsRow", () ->
  view_proxy = null
  tweet = Factory('tweet', {created_at: 'Wed Sep 19 15:10:11 +0000 2012'})
  
  beforeEach(() ->
    view_proxy = TwitterNewsRow.render(tweet)
  )
    
  it('has a label with the name in it', () ->
    expect(view_proxy.title.text).toEqual('Doctors w/o Borders')
  )
  
  it('adds the picture icon', () ->
    expect(view_proxy.photo.image).toEqual(tweet.user.profile_image_url)
  )
  
  it('formats the date correctly', () ->
    expect(view_proxy.date.text).toEqual('Sep 19')
  )
)
