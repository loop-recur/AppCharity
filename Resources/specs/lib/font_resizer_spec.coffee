require('../helpers/SpecHelper')

describe("lib/font_resizer", () ->
  it("it returns a label who's text fits in it's width", () ->
    label = UI.createLabel({
      width: 100,
      font:{fontFamily:'Helvetica Neue', fontSize:16, fontWeight:'bold'},
      text: 'This is an extremely long string..... asfasdf'
    })

    fontResizer(label)
    expect(label.font.fontSize).toBeLessThan(16)
  )
)