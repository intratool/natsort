import natsort from '../../src'

describe('unicode:', () => {
  it('basic latin', () => {
    const arr1 = ['\u0044', '\u0055', '\u0054', '\u0044', '\u0043']
    const arr2 = ['\u0043', '\u0044', '\u0044', '\u0054', '\u0055']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('unicode string', () => {
    const arr1 = ['\u30c6\u30b9\u30c8', '\u30c6\u30b9\u30c8 10.txt', '\u30c6\u30b9\u30c8']
    const arr2 = ['\u30c6\u30b9\u30c8', '\u30c6\u30b9\u30c8', '\u30c6\u30b9\u30c8 10.txt']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })
})
