require('../helpers/SpecHelper');

describe("Photo Gallery", () ->
  view_proxy = null
  photo = {testing_text: "Object Literal posing as a fake photo"}
  
  beforeEach(() ->
    spyOn(Cloud.Photos, 'create')
    view_proxy = Windows.PhotoGallery()
  )
  
  describe("Photo taken with Camera", () -> 

    beforeEach(() ->
      spyOn(Ti.Media, 'showCamera').andCallFake((camera_options) -> camera_options.success({media: photo}))
      view_proxy.photo_upload_btn.fireEvent('click')
    )  

    it('should pull open the camera to take a new photo when clicked', () ->
      expect(Ti.Media.showCamera).toHaveBeenCalled()
    )
    
    it('should upload the camera taken photo to the ACS cloud', () -> 
      expect(Cloud.Photos.create).toHaveBeenCalledWith({photo: photo}, jasmine.any(Function))
    )
      
    it("should show the photo in the photo grid after it is uploaded", () ->
      
    )
    
  
  )
    
  
  describe("Photo selected from Phone via personal Photo Gallery", () ->

    beforeEach(() ->
      spyOn(Ti.Media, 'openPhotoGallery').andCallFake((gallery_options) -> gallery_options.success({media: photo}))
      #TODO: This test does not match the comp yet. It is unknown the exact mechanism for a photo to come from a photo gallery. For now we assume an additional button.
      # This should change later once a decision has been made.
      view_proxy.photo_picker_btn.fireEvent('click')
    )  

    it('should open up the phone photo picker when the photo gallery button is pressed', () -> 
      expect(Ti.Media.openPhotoGallery).toHaveBeenCalled()
    )
    
    it('should upload the gallery selected photo to the ACS cloud', () -> 
      expect(Cloud.Photos.create).toHaveBeenCalledWith({photo: photo}, jasmine.any(Function))
    )
  )
  
  describe("PhotoGrid photos", () -> 
  
    it("should allow deletion of a photo", () -> 
    
    )
  
    it("should allow scrolling when there are multiple photos to show", () ->
      
    )
    
  
  )
    
)

