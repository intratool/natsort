import natsort from '../../src'

describe('numeric:', () => {
  it('string vs number', () => {
    const arr1 = ['10', 9, 2, '1', '4']
    const arr2 = ['1', 2, '4', 9, '10']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('0 left-padded numbers', () => {
    const arr1 = ['0001', '002', '001']
    const arr2 = ['0001', '001', '002']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('0 left-padded numbers and regular numbers', () => {
    const arr1 = ['10.0401', 10.022, 10.042, '10.021999']
    const arr2 = ['10.021999', 10.022, '10.0401', 10.042]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('decimal string vs decimal, same precision', () => {
    const arr1 = ['10.04', 10.02, 10.03, '10.01']
    const arr2 = ['10.01', 10.02, 10.03, '10.04']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('decimal string vs decimal, different precision', () => {
    const arr1 = ['10.0401', 10.022, 10.042, '10.021999']
    const arr2 = ['10.021999', 10.022, '10.0401', 10.042]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it("float/decimal with 'F' or 'D' notation", () => {
    const arr1 = ['10.04f', '10.039F', '10.038d', '10.037D']
    const arr2 = ['10.037D', '10.038d', '10.039F', '10.04f']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('not float/decimal notation', () => {
    const arr1 = ['10.004Z', '10.039T', '10.038ooo', '10.037g']
    const arr2 = ['10.004Z', '10.037g', '10.038ooo', '10.039T']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('scientific notation', () => {
    const arr1 = ['1.528535047e5', '1.528535047e7', '1.528535047e3']
    const arr2 = ['1.528535047e3', '1.528535047e5', '1.528535047e7']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('negative numbers as strings', () => {
    const arr1 = ['-1', '-2', '4', '-3', '0', '-5']
    const arr2 = ['-5', '-3', '-2', '-1', '0', '4']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('negative numbers as strings - mixed input type, string + numeric', () => {
    const arr1 = [-1, '-2', 4, -3, '0', '-5']
    const arr2 = ['-5', -3, '-2', -1, '0', 4]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('negative floats - all numeric', () => {
    const arr1 = [-2.01, -2.1, 4.144, 4.1, -2.001, -5]
    const arr2 = [-5, -2.1, -2.01, -2.001, 4.1, 4.144]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('money', () => {
    const arr1 = ['$10002.00', '$10001.02', '$10001.01']
    const arr2 = ['$10001.01', '$10001.02', '$10002.00']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })
})
