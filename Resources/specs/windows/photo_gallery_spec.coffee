require('../../specs/helpers/spec_helper')

PhotoGalleryWin = nrequire('/windows/photo_gallery')
Slideshow = nrequire('templates/windows/slideshow')
PropertyCache = nrequire('/lib/property_cache')

describe("Photo Gallery", () ->
  view_proxy = null
  photo = {testing_text: "Object Literal posing as a fake photo"}
  
  beforeEach(() ->
    spyOn(Cloud.Photos, 'create').andCallFake((credentials, callback) -> callback({success: true}))
    spyOn(Slideshow, 'render').andCallThrough()
    view_proxy = PhotoGalleryWin()
    view_proxy.win.fireEvent('focus')
  )
  
  describe("Photo taken with Camera", () ->

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
    
    it('refreshes the grid', ()->
      expect(view_proxy.photo_grid.children[0].children.length).toEqual(2)
      view_proxy.photo_upload_btn.fireEvent('click')
      view_proxy.confirmation.fireEvent('click', {index: 0})
      expect(view_proxy.photo_grid.children[0].children.length).toEqual(3)
    )
  )
  
  describe("Photo selected from Phone via personal Photo Gallery", () ->
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
    grid_scroll_view = null
  
    beforeEach(() ->
      PropertyCache.setup({cache_time: 10000})
      spyOn(Cloud.Photos, 'query').andCallFake((query_args, cb) -> cb(Factory('photo_query_response')))
      view_proxy.win.fireEvent('focus')
      grid_scroll_view = view_proxy.photo_grid.children[0]
    )
    
    it('caches the response', () ->
      view_proxy.win.fireEvent('focus')
      expect(Cloud.Photos.query.callCount).toEqual(1)
      PropertyCache.setup({cache_time: 1})
      sleep(10)
      view_proxy.win.fireEvent('focus')
      expect(Cloud.Photos.query.callCount).toEqual(2)
    )
    
    it('doesnt put the page on there twice from focus', () ->
      PropertyCache.setup({cache_time: 1})
      original_amount_of_elements_on_screen = view_proxy.win.children.length
      sleep(10)
      view_proxy.win.fireEvent('focus')
      expect(view_proxy.win.children.length).toEqual(original_amount_of_elements_on_screen)
    )
    
    it('gets photos on window focus', () ->
      expect(grid_scroll_view.children[0].image.image).toEqual('http://storage.cloud.appcelerator.com/bx017YfidhbNRHRMlhZCTl4dOy8Ug9qH/photos/89/43/5060e1cb18897b7d71031f21/99d6780_small_240.jpeg')
    )

    it('expects the last item in the grid to be photo_upload_btn', () ->
      expect(grid_scroll_view.children[1].backgroundImage).toEqual('/images/buttons/photo_grid_add_btn_sml.png')
    )
    
    it('opens the slideshow', () ->
      view_proxy.photo_grid.fireEvent('click', {source: {index: 2}})
      expect(Slideshow.render).toHaveBeenCalledWith(jasmine.any(Array), 2)
    )
  )
    
)

