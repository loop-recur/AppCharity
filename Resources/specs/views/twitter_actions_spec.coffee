require('../helpers/SpecHelper');

describe("Views/TwitterActions", () ->
  view_proxy = null
  tweet = Factory('tweet', {name: 'some name', created_time: '2012-09-07T20:26:48+0000'})
  
  beforeEach(() ->
    spyOn(Twitter, 'retweet').andCallFake((id, cb) -> cb({success: true}) )
    spyOn(Twitter, 'favorite').andCallFake((id, cb) -> cb({success: true}) )
    spyOn(Twitter, 'reply').andCallFake((id, text, cb) -> cb({success: true}) )
    spyOn(UI, 'createAlertMessage').andCallThrough()
    view_proxy = Views.TwitterActions(tweet)
  )
  
  it('retweets the tweet', () ->
    view_proxy.retweet.fireEvent('click')
    expect(Twitter.retweet).toHaveBeenCalledWith(tweet.id_str, jasmine.any(Function));
    expect(UI.createAlertMessage).toHaveBeenCalledWith("You've successfully retweeted!");
  )
  
  it('favorites the tweet', () ->
    view_proxy.favorite.fireEvent('click')
    expect(Twitter.favorite).toHaveBeenCalledWith(tweet.id_str, jasmine.any(Function));
    expect(UI.createAlertMessage).toHaveBeenCalledWith("You've successfully favorited!");
  )
)
