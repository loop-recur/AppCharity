require('../helpers/SpecHelper');

describe("Windows/Application", () ->
    
  it('creates a tabgroup with all the tabs on it', () ->
    expect(Windows.Application.events.window).toBeTruthy()
    expect(Windows.Application.news.window).toBeTruthy()
    expect(Windows.Application.photos.window).toBeTruthy()
    expect(Windows.Application.about.window).toBeTruthy()
  )
  
  it('opens the app', () ->
    expect(Windows.Application.tab_group.children.length).toEqual(0)
    Windows.Application.open()
    expect(Windows.Application.tab_group.children.length).toBeGreaterThan(4)
  )
  
  it('shows/hides the spinner', () ->
    Windows.Application.open()
    Ti.App.fireEvent('show_activity');
    expect(Windows.Application.spinner.visible).toBeTruthy()
    Ti.App.fireEvent('hide_activity');
    expect(Windows.Application.spinner.visible).toBeFalsy()
  ) 
)