require('../helpers/SpecHelper');

describe("Views/TwitterNewsRow", () ->
  view_proxy = null
  tweet = Factory('tweet')
  
  beforeEach(() ->
    view_proxy = Views.TwitterNewsRow(tweet)
  )
    
  it('has a label with the name in it', () ->
    expect(view_proxy.title.text).toEqual('Doctors w/o Borders');
  )
  
  it('adds the picture icon', () ->
    expect(view_proxy.photo.image).toEqual(tweet.user.profile_image_url);
  )
)
