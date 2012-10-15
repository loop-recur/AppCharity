

describe("Views/TwitterActions", () ->
  view_proxy = null
  tweet = Factory('tweet', {name: 'some name', created_time: '2012-09-07T20:26:48+0000'})
  
  beforeEach(() ->
    spyOn(Windows, 'Tweet').andCallThrough()
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

  it('opens a window for the user to reply with and replies', () ->
    view_proxy.reply.fireEvent('click')
    expect(Windows.Tweet).toHaveBeenCalledWith('MSF_USA', jasmine.any(Function))
    view_proxy.tweet_view.text_field.value = 'yo yo'
    view_proxy.tweet_view.tweet_button.fireEvent('click')
    expect(Twitter.reply).toHaveBeenCalledWith(tweet.id_str, "yo yo", jasmine.any(Function));
    expect(UI.createAlertMessage).toHaveBeenCalledWith("You've successfully replied!");
  )
  
  xit('opens the twitter page', ()->
  )
)
