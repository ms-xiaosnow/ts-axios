import AxiosCancel, { isCancel } from '../../src/cancel/AxiosCancel'

describe('cancel:Cancel', () => {
  test('should returns correct result when message is a specified', () => {
    const cancel = new AxiosCancel('Operation has been canceled.')
    expect(cancel.message).toBe('Operation has been canceled.')
  })

  test('should returns true if value is a Cancel', () => {
    expect(isCancel(new AxiosCancel())).toBeTruthy()
  })

  test('should returns false if value is not a Cancel', () => {
    expect(isCancel({ foo: 'bar' })).toBeFalsy()
  })

})
