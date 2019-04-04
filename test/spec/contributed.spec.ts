import natsort from '../../src'

describe('contributed tests:', () => {
  it('contributed - Bob Zeiner (Chrome not stable sort)', () => {
    const arr1 = ['T78', 'U17', 'U10', 'U12', 'U14', '745', 'U7', '485', 'S16', 'S2', 'S22', '1081', 'S25', '1055', '779', '776', '771', '44', '4', '87', '1091', '42', '480', '952', '951', '756', '1000', '824', '770', '666', '633', '619', '1', '991', '77H', 'PIER-7', '47', '29', '9', '77L', '433'] // prettier-ignore
    const arr2 = ['1', '4', '9', '29', '42', '44', '47', '77H', '77L', '87', '433', '480', '485', '619', '633', '666', '745', '756', '770', '771', '776', '779', '824', '951', '952', '991', '1000', '1055', '1081', '1091', 'PIER-7', 'S2', 'S16', 'S22', 'S25', 'T78', 'U7', 'U10', 'U12', 'U14', 'U17'] // prettier-ignore
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('contributed - Scott', () => {
    const arr1 = [
      'FSI stop, Position: 5',
      'Mail Group stop, Position: 5',
      'Mail Group stop, Position: 5',
      'FSI stop, Position: 6',
      'FSI stop, Position: 6',
      'Newsstand stop, Position: 4',
      'Newsstand stop, Position: 4',
      'FSI stop, Position: 5'
    ]
    const arr2 = [
      'FSI stop, Position: 5',
      'FSI stop, Position: 5',
      'FSI stop, Position: 6',
      'FSI stop, Position: 6',
      'Mail Group stop, Position: 5',
      'Mail Group stop, Position: 5',
      'Newsstand stop, Position: 4',
      'Newsstand stop, Position: 4'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('undefined support - jarvinen pekka', () => {
    const arr1 = [2, 10, 1, 'azd', undefined, 'asd']
    const arr2 = [1, 2, 10, 'asd', 'azd', undefined]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('invalid numeric string sorting - guilermo.dev', () => {
    const arr1 = ['-1', '-2', '4', '-3', '0', '-5']
    const arr2 = ['-5', '-3', '-2', '-1', '0', '4']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('invalid sort order - Howie Schecter', () => {
    const arr1 = ['9', '11', '22', '99', 'A', 'aaaa', 'bbbb', 'Aaaa', 'aAaa', 'aa', 'AA', 'Aa', 'aA', 'BB', 'bB', 'aaA', 'AaA', 'aaa'] // prettier-ignore
    const arr2 = ['9', '11', '22', '99', 'A', 'AA', 'Aa', 'AaA', 'Aaaa', 'BB', 'aA', 'aAaa', 'aa', 'aaA', 'aaa', 'aaaa', 'bB', 'bbbb'] // prettier-ignore
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('alphanumeric - number first', () => {
    const arr1 = ['5D', '1A', '2D', '33A', '5E', '33K', '33D', '5S', '2C', '5C', '5F', '1D', '2M']
    const arr2 = ['1A', '1D', '2C', '2D', '2M', '5C', '5D', '5E', '5F', '5S', '33A', '33D', '33K']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('sorting incorrect when there is a space - adrien-be', () => {
    const arr1 = ['img 99', 'img199', 'imga99', 'imgz99']
    const arr2 = ['img 99', 'img199', 'imga99', 'imgz99']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('expanded test', () => {
    const arr1 = ['img199', 'img 99', 'imga99', 'imgz 99', 'imgb99', 'imgz199']
    const arr2 = ['img 99', 'img199', 'imga99', 'imgb99', 'imgz 99', 'imgz199']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('any zeros that precede a number messes up the sorting - menixator', () => {
    const arr1 = ['1', '02', '3']
    const arr2 = ['1', '02', '3']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it("['1.100', '1.10', '1.1', '1.54'] etc do not sort properly - rubenstolk", () => {
    const arr1 = ['1.100', '1.1', '1.10', '1.54']
    const arr2 = ['1.100', '1.1', '1.10', '1.54']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it("['v1.100', 'v1.10', 'v1.1', 'v1.54'] etc do not sort properly - rubenstolk (bypass float coercion)", () => {
    const arr1 = ['v1.100', 'v1.1', 'v1.10', 'v1.1000', 'v1.54']
    const arr2 = ['v1.1', 'v1.10', 'v1.54', 'v1.100', 'v1.1000']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('large numbers make sorting very slow - Mottie', () => {
    const arr1 = [
      'MySnmp 1234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
      'MySnmp 4234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
      'MySnmp 2234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
      'MySnmp 3234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567'
    ]
    const arr2 = [
      'MySnmp 1234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
      'MySnmp 2234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
      'MySnmp 3234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567',
      'MySnmp 4234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567891234567'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('javascript error', () => {
    const arr1 = ['bar.1-2', 'bar.1']
    const arr2 = ['bar.1', 'bar.1-2']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it("['SomeString', 'SomeString 1'] bombing on 'undefined is not an object' - dannycochran", () => {
    const arr1 = ['SomeString', 'SomeString 1']
    const arr2 = ['SomeString', 'SomeString 1']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('sorting umlauts characters \xC4, \xD6, \xDC - diogoalves', () => {
    const arr1 = ['Udet', '\xDCbelacker', 'Uell', '\xDClle', 'Ueve', '\xDCxk\xFCll', 'Uffenbach']
    const arr2 = ['\xDCbelacker', 'Udet', 'Uell', 'Ueve', 'Uffenbach', '\xDClle', '\xDCxk\xFCll']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it("['2.2 sec','1.9 sec','1.53 sec'] - padded by spaces - harisb", () => {
    const arr1 = ['2.2 sec', '1.9 sec', '1.53 sec']
    const arr2 = ['1.53 sec', '1.9 sec', '2.2 sec']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it("['2.2sec','1.9sec','1.53sec'] - no padding - harisb", () => {
    const arr1 = ['2.2sec', '1.9sec', '1.53sec']
    const arr2 = ['1.53sec', '1.9sec', '2.2sec']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('version string first and string last - jpuffer', () => {
    const arr1 = [
      'version-3.27.3',
      'version-3.27.0',
      'version-3.26.0',
      'version-other',
      'version-3.28.0',
      'version-3.29.1'
    ]
    const arr2 = [
      'version-3.26.0',
      'version-3.27.0',
      'version-3.27.3',
      'version-3.28.0',
      'version-3.29.1',
      'version-other'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('partial version numbers (missing patch or minor) - jpuffer', () => {
    const arr1 = ['3.27.3', '3.27', '3', 'other', '3.28', '3.29.1']
    const arr2 = ['3', '3.27', '3.27.3', '3.28', '3.29.1', 'other']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })
})
