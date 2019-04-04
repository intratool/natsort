import natsort from '../../src'

describe('datetime:', () => {
  it('similar dates', () => {
    const arr1 = ['10/12/2008', '10/11/2007', '10/11/2008', '10/12/2007']
    const arr2 = ['10/11/2007', '10/12/2007', '10/11/2008', '10/12/2008']
    expect(arr1.sort(natsort())).toEqual(arr2)

    const arr3 = ['01/10/2008', '01/01/1992', '01/01/2008', '01/01/1991']
    const arr4 = ['01/01/1991', '01/01/1992', '01/01/2008', '01/10/2008']
    expect(arr3.sort(natsort())).toEqual(arr4)
  })

  it('different timezones', () => {
    const arr1 = [
      'Wed Jan 01 2010 00:00:00 GMT-0800 (Pacific Standard Time)',
      'Thu Dec 31 2009 00:00:00 GMT-0800 (Pacific Standard Time)',
      'Wed Jan 01 2010 00:00:00 GMT-0500 (Eastern Standard Time)'
    ]
    const arr2 = [
      'Thu Dec 31 2009 00:00:00 GMT-0800 (Pacific Standard Time)',
      'Wed Jan 01 2010 00:00:00 GMT-0500 (Eastern Standard Time)',
      'Wed Jan 01 2010 00:00:00 GMT-0800 (Pacific Standard Time)'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('Short datetime', () => {
    const arr1 = [
      'Saturday, July 3, 2010 1:45 AM',
      'Saturday, July 3, 2010 1:45 PM',
      'Monday, August 2, 2010 1:45 PM',
      'Monday, May 3, 2010 1:45 PM'
    ]
    const arr2 = [
      'Monday, May 3, 2010 1:45 PM',
      'Saturday, July 3, 2010 1:45 AM',
      'Saturday, July 3, 2010 1:45 PM',
      'Monday, August 2, 2010 1:45 PM'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)

    const arr3 = [
      'Saturday, July 3, 2010 1:45:29 PM',
      'Saturday, July 3, 2010 1:45:30 PM',
      'Monday, August 2, 2010 1:45:01 PM',
      'Monday, May 3, 2010 1:45:00 PM'
    ]
    const arr4 = [
      'Monday, May 3, 2010 1:45:00 PM',
      'Saturday, July 3, 2010 1:45:29 PM',
      'Saturday, July 3, 2010 1:45:30 PM',
      'Monday, August 2, 2010 1:45:01 PM'
    ]
    expect(arr3.sort(natsort())).toEqual(arr4)

    const arr5 = ['2/15/2009 1:45 PM', '1/15/2009 1:45 PM', '2/15/2009 1:45 AM']
    const arr6 = ['1/15/2009 1:45 PM', '2/15/2009 1:45 AM', '2/15/2009 1:45 PM']
    expect(arr5.sort(natsort())).toEqual(arr6)
  })

  it('Date.toString(), Date.toLocaleString()', () => {
    const arr1 = ['Monday, August 2, 2010', 'Saturday, July 3, 2010', 'Monday, May 3, 2010']
    const arr2 = ['Monday, May 3, 2010', 'Saturday, July 3, 2010', 'Monday, August 2, 2010']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('Date.toUTCString()', () => {
    const arr1 = [
      'Mon, 15 Jun 2009 20:45:30 GMT',
      'Mon, 3 May 2010 17:45:30 GMT',
      'Mon, 15 Jun 2009 17:45:30 GMT'
    ]
    const arr2 = [
      'Mon, 15 Jun 2009 17:45:30 GMT',
      'Mon, 15 Jun 2009 20:45:30 GMT',
      'Mon, 3 May 2010 17:45:30 GMT'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('ISO8601 Dates', () => {
    const arr1 = [
      '2010-06-15T13:45:30',
      '2009-06-15T01:45:30.2',
      '2009-06-15T13:45:30',
      '2009-01-15T01:45:30'
    ]
    const arr2 = [
      '2009-01-15T01:45:30',
      '2009-06-15T01:45:30.2',
      '2009-06-15T13:45:30',
      '2010-06-15T13:45:30'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('ISO8601-ish YYYY-MM-DDThh:mm:ss - which does not parse into a Date instance', () => {
    const arr1 = ['2010-06-15 13:45:30', '2009-06-15 13:45:30', '2009-01-15 01:45:30']
    const arr2 = ['2009-01-15 01:45:30', '2009-06-15 13:45:30', '2010-06-15 13:45:30']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('RFC1123 testing different timezones', () => {
    const arr1 = [
      'Mon, 15 Jun 2009 20:45:30 PDT',
      'Mon, 15 Jun 2009 20:45:30 GMT',
      'Mon, 15 Jun 2009 20:45:30 EST'
    ]
    const arr2 = [
      'Mon, 15 Jun 2009 20:45:30 GMT',
      'Mon, 15 Jun 2009 20:45:30 EST',
      'Mon, 15 Jun 2009 20:45:30 PDT'
    ]
    expect(arr1.sort(natsort())).toEqual(arr2)
  })

  it('unix epoch, Date.getTime()', () => {
    const arr1 = ['14330728000', '1245098728000', '1245098730000']
    const arr2 = ['14330728000', '1245098728000', '1245098730000']
    expect(arr1.sort(natsort())).toEqual(arr2)
  })
})
