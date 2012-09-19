require('../helpers/SpecHelper');

describe("Photo Gallery", () ->
  view_proxy = null
  photo = {testing_text: "Object Literal posing as a fake photo"}
  
  beforeEach(() ->
    spyOn(Cloud.Photos, 'create')
    spyOn(Ti.Media, 'showCamera').andCallFake((camera_options) -> camera_options.success({media: photo}))
    view_proxy = Windows.PhotoGallery()
    view_proxy.photo_upload_btn.fireEvent('click')
  )
    
  it('should pull open the camera to take a new photo when clicked', () ->
    expect(Ti.Media.showCamera).toHaveBeenCalled()
  )
  
  it('should upload the camera taken photo to the ACS cloud', () -> 
    expect(Cloud.Photos.create).toHaveBeenCalledWith({photo: photo}, jasmine.any(Function))
  )
  
  it('should return back to the photo gallery page after the photo was successfully taken', () -> 
  
  )
    
)

