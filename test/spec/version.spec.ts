import natsort from '../../src'

describe('version number strings:', () => {
  it('close version numbers', () => {
    const arr1 = ['1.0.2', '1.0.1', '1.0.0', '1.0.9']
    const arr2 = ['1.0.0', '1.0.1', '1.0.2', '1.0.9']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('more version numbers', () => {
    const arr1 = ['1.1.100', '1.1.1', '1.1.10', '1.1.54']
    const arr2 = ['1.1.1', '1.1.10', '1.1.54', '1.1.100']
    expect(arr1.sort(natsort())).toEqual(arr2)

    // TODO: Handle all semver version numbers
    // const arr3 = ['1.10.0', '1.11.0', '1.9.0', '1.8.0']
    // const arr4 = ['1.8.0', '1.9.0', '1.10.0', '1.11.0']
    // expect(arr3.sort(natsort())).toEqual(arr4)
  })

  it('multi-digit branch release', () => {
    const arr1 = ['1.0.03', '1.0.003', '1.0.002', '1.0.0001']
    const arr2 = ['1.0.0001', '1.0.002', '1.0.003', '1.0.03']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('string last', () => {
    const arr1 = [
      '1.1beta',
      '1.1.2alpha3',
      '1.0.2alpha3',
      '1.0.2alpha1',
      '1.0.1alpha4',
      '2.1.2',
      '2.1.1'
    ]
    const arr2 = [
      '1.0.1alpha4',
      '1.0.2alpha1',
      '1.0.2alpha3',
      '1.1.2alpha3',
      '1.1beta',
      '2.1.1',
      '2.1.2'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('string first', () => {
    const arr1 = [
      'myRelease-1.1.3',
      'myRelease-1.2.3',
      'myRelease-1.1.4',
      'myRelease-1.1.1',
      'myRelease-1.0.5'
    ]
    const arr2 = [
      'myRelease-1.0.5',
      'myRelease-1.1.1',
      'myRelease-1.1.3',
      'myRelease-1.1.4',
      'myRelease-1.2.3'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })
})
