import natsort from '../../src'

describe('handle of space:', () => {
  it('space(s) as first character(s)', () => {
    const arr1 = ['alpha', ' 1', '  3', ' 2', 0]
    const arr2 = [0, ' 1', ' 2', '  3', 'alpha']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('empty strings and space character', () => {
    const arr1 = ['10023', '999', '', 2, 5.663, 5.6629]
    const arr2 = ['', 2, 5.6629, 5.663, '999', '10023']
    expect(arr1.sort(natsort())).toEqual(arr2)

    const arr3 = [0, '0', '', '']
    const arr4 = ['', '', 0, '0']
    expect(arr3.sort(natsort())).toEqual(arr4)
  })
})
