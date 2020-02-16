import axios from '../src'

describe('static', () => {
  test('should support all', done => {
    let fullfilled = false

    axios.all([true, false]).then(arg => {
      fullfilled = arg[0]
    })

    setTimeout(() => {
      expect(fullfilled).toBeTruthy()
      done()
    }, 100)
  })

  test('should support spread', done => {
    let sum = 0
    let fullfilled = false
    let result: any

    axios
      .all([123, 456])
      .then(
        axios.spread((a, b) => {
          sum = a + b
          fullfilled = true
          return 'hello world'
        })
      )
      .then(res => {
        result = res
      })

    setTimeout(() => {
      expect(fullfilled).toBeTruthy()
      expect(sum).toBe(123 + 456)
      expect(result).toBe('hello world')
      done()
    }, 100)
  })
})
