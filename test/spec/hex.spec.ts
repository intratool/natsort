import natsort from '../../src'

describe('hex:', () => {
  it('real hex numbers', () => {
    const arr1 = ['0xA', '0x9', '0x9', '0x99']
    const arr2 = ['0x9', '0x9', '0xA', '0x99']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('fake hex numbers', () => {
    const arr1 = ['0xZZ', '0xVVV', '0xVEV', '0xUU']
    const arr2 = ['0xUU', '0xVEV', '0xVVV', '0xZZ']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })
})
