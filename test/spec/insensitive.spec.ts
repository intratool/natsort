import natsort from '../../src'

describe('case insensitive support:', () => {
  it('case sensitive pre-sorted array', () => {
    const arr1 = ['A', 'b', 'C', 'd', 'E', 'f']
    const arr2 = ['A', 'b', 'C', 'd', 'E', 'f']
    expect(arr1.sort(natsort({ insensitive: true }))).toEqual(arr2)
  })

  it('case sensitive un-sorted array', () => {
    const arr1 = ['A', 'C', 'E', 'b', 'd', 'f']
    const arr2 = ['A', 'b', 'C', 'd', 'E', 'f']
    expect(arr1.sort(natsort({ insensitive: true }))).toEqual(arr2)
  })

  it('case insensitive pre-sorted array', () => {
    const arr1 = ['A', 'C', 'E', 'b', 'd', 'f']
    const arr2 = ['A', 'C', 'E', 'b', 'd', 'f']
    expect(arr1.sort(natsort({ insensitive: false }))).toEqual(arr2)
  })

  it('case insensitive un-sorted array', () => {
    const arr1 = ['A', 'b', 'C', 'd', 'E', 'f']
    const arr2 = ['A', 'C', 'E', 'b', 'd', 'f']
    expect(arr1.sort(natsort({ insensitive: false }))).toEqual(arr2)
  })
})
