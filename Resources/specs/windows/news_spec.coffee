require('../helpers/SpecHelper');

describe("Windows/News", () ->
  view_proxy = null
  
  beforeEach(() ->
    # spyOn(FbGraph, 'getNewsFeed').andCallFake((camera_options) -> camera_options.success())
    view_proxy = Windows.PhotoGallery()
    view_proxy.photo_upload_btn.fireEvent('click')
  )
    
  it('should pull open the camera to take a new photo when clicked', () ->
    # expect(Ti.Media.showCamera).toHaveBeenCalled()
  )
    
)
