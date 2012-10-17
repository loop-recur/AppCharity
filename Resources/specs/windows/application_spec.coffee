require('../../specs/helpers/spec_helper')

describe("Windows/Application", () ->

  it('creates a tabgroup with all the tabs on it', () ->
    expect(Application.events.window).toBeTruthy()
    expect(Application.news.window).toBeTruthy()
    expect(Application.photos.window).toBeTruthy()
    expect(Application.about.window).toBeTruthy()
  )
  
  it('opens the app from init script', () ->
    expect(Application.tab_group.children.length).toBeGreaterThan(4)
  )
  
  it('shows/hides the spinner', () ->
    Application.open()
    Ti.App.fireEvent('show_activity')
    expect(Application.spinner.visible).toBeTruthy()
    Ti.App.fireEvent('hide_activity')
    expect(Application.spinner.visible).toBeFalsy()
  )
)
