import natsort from '../../src'

describe('desc support:', () => {
  it('desc pre-sorted array', () => {
    const arr1 = ['A', 'C', 'E', 'b', 'd', 'f']
    const arr2 = ['f', 'd', 'b', 'E', 'C', 'A']
    expect(arr1.sort(natsort({ desc: true }))).toEqual(arr2)
  })

  it('desc un-sorted array', () => {
    const arr1 = ['A', 'C', 'E', 'b', 'd', 'f']
    const arr2 = ['f', 'd', 'b', 'E', 'C', 'A']
    expect(arr1.sort(natsort({ desc: true }))).toEqual(arr2)
  })

  it('asc pre-sorted array', () => {
    const arr1 = ['A', 'C', 'E', 'b', 'd', 'f']
    const arr2 = ['A', 'C', 'E', 'b', 'd', 'f']
    expect(arr1.sort(natsort({ insensitive: false }))).toEqual(arr2)
  })

  it('asc un-sorted array', () => {
    const arr1 = ['A', 'b', 'C', 'd', 'E', 'f']
    const arr2 = ['A', 'C', 'E', 'b', 'd', 'f']
    expect(arr1.sort(natsort({ insensitive: false }))).toEqual(arr2)
  })
})
