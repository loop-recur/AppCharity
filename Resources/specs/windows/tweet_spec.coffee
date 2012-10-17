require('../../specs/helpers/spec_helper')

TweetWin = nrequire('templates/windows/tweet')

describe("Windows/Tweet", () ->
  view_proxy = null
  cb = () ->
  tweet = Factory('tweet', {name: 'some name', created_time: '2012-09-07T20:26:48+0000'})
  
  beforeEach(() ->
    cb = jasmine.createSpy('callback')
    view_proxy = TweetWin.render("MSF_USA", cb)
  )
  
  
  it('shows the user as the hint text', () ->
    expect(view_proxy.text_field.hintText).toEqual('@MSF_USA')
  )
  
  it('prepends the text with', () ->
    expect(view_proxy.text_field.value).toEqual('@MSF_USA ')
  )
  
  it('calls the callback with the text', () ->
    view_proxy.text_field.value = '@MSF_USA yo yo'
    view_proxy.tweet_button.fireEvent('click')
    expect(cb).toHaveBeenCalledWith("@MSF_USA yo yo")
  )
  
)
