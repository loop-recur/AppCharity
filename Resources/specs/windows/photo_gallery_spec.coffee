require('../helpers/SpecHelper');

describe("Photo Gallery", () ->
  view_proxy = null
  photo = {testing_text: "Object Literal posing as a fake photo"}
  
  beforeEach(() ->
    spyOn(Cloud.Photos, 'create')
    spyOn(Cloud.Users, 'login').andCallFake((credentials, callback) -> callback({success: true}))
    view_proxy = Windows.PhotoGallery()
  )
  
  xdescribe("Photo taken with Camera", () -> 

    beforeEach(() ->
      spyOn(Ti.Media, 'showCamera').andCallFake((camera_options) -> camera_options.success({media: photo}))
      view_proxy.photo_upload_btn.fireEvent('click')
      view_proxy.confirmation.fireEvent('click', {index: 0})
    )

    it('should pull open the camera to take a new photo when clicked', () ->
      expect(Ti.Media.showCamera).toHaveBeenCalled()
    )
    
    it('should upload the camera taken photo to the ACS cloud', () -> 
      expect(Cloud.Photos.create).toHaveBeenCalledWith({photo: photo}, jasmine.any(Function))
    )
  )
    
  
  xdescribe("Photo selected from Phone via personal Photo Gallery", () ->
    beforeEach(() ->
      spyOn(Ti.Media, 'openPhotoGallery').andCallFake((gallery_options) -> gallery_options.success({media: photo}))
      view_proxy.photo_upload_btn.fireEvent('click')
      view_proxy.confirmation.fireEvent('click', {index: 1})
    )  

    it('should open up the phone photo picker when the photo gallery button is pressed', () -> 
      expect(Ti.Media.openPhotoGallery).toHaveBeenCalled()
    )
    
    it('should upload the gallery selected photo to the ACS cloud', () -> 
      expect(Cloud.Photos.create).toHaveBeenCalledWith({photo: photo}, jasmine.any(Function))
    )
  )
  
  
  describe('Photo Grid', () ->
  
    beforeEach(() ->
      spyOn(Cloud.Photos, 'query').andCallFake((query_args, cb) -> cb(Factory('photo_query_response')))
    )
  
    xit('should attempt to get photos on window focus', () -> 
      view_proxy.win.fireEvent('focus')    
      expect(view_proxy.photo_grid.children[0].children[0].image).toEqual('http://storage.cloud.appcelerator.com/bx017YfidhbNRHRMlhZCTl4dOy8Ug9qH/photos/89/43/5060e1cb18897b7d71031f21/99d6780_small_240.jpeg')
    )
    
    it('doesnt put the page on there twice from focus', () ->
      view_proxy.win.fireEvent('focus')
      PropertyCache.setup({cache_time: 1});
      original_amount_of_elements_on_screen = view_proxy.win.children.length
      sleep(10)
      view_proxy.win.fireEvent('focus')
      expect(view_proxy.win.children.length).toEqual(original_amount_of_elements_on_screen)
    )
  )  
    
)

