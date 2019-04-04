import natsort from '../../src'

describe('filename:', () => {
  it('simple image filename', () => {
    const arr1 = ['img1.png', 'img12.png', 'img10.png', 'img2.png', 'img1.png']
    const arr2 = ['img1.png', 'img1.png', 'img2.png', 'img10.png', 'img12.png']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('complex filename', () => {
    const arr1 = [
      'car.mov',
      '01alpha.sgi',
      '001alpha.sgi',
      'my.string_41299.tif',
      'organic2.0001.sgi'
    ]
    const arr2 = [
      '001alpha.sgi',
      '01alpha.sgi',
      'car.mov',
      'my.string_41299.tif',
      'organic2.0001.sgi'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('unix filename', () => {
    const arr1 = [
      './system/kernel/js/01_ui.core.js',
      './system/kernel/js/00_jquery-1.3.2.js',
      './system/kernel/js/02_my.desktop.js'
    ]
    const arr2 = [
      './system/kernel/js/00_jquery-1.3.2.js',
      './system/kernel/js/01_ui.core.js',
      './system/kernel/js/02_my.desktop.js'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })
})
