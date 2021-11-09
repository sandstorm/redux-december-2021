import { add } from './example'

// 'getRandomListElement.ts'
type NumberGenerator = (min: number, max: number) => number

const getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min

// Code under test
export const getRandomListElement = <T>(numberGenerator: NumberGenerator = getRandomNumber, list: Array<T>): T => {
  const index = numberGenerator(0, list.length - 1)
  return list[index]
}

// 'getRandomListElement.test.ts'
describe('getRandomListElement', () => {
  it('should call numberGenerator and return list item', () => {
    // Create a deterministic mock implementation of the NumberGenerator type
    // which always returns the min value
    const mockNumbeGenerator = jest.fn((min, _max) => min)

    const result = getRandomListElement(mockNumbeGenerator, ['a', 'b', 'c'])
    expect(result).toBe('a')
    expect(mockNumbeGenerator).toHaveBeenCalled()
    expect(mockNumbeGenerator).toHaveBeenCalledTimes(1)
    expect(mockNumbeGenerator).toHaveBeenCalledWith(0, 2)
  })
})

describe('example test suite', () => {
  it('should correctly add numbers', () => {
    const result = add(2, 3)
    expect(result).toBe(5)
  })

  test.each([
    [1, 1, 2],
    [2, 2, 4],
    [3, 3, 6],
    [4, 4, 8],
  ])('each addition is correct', (a, b, expected) => expect(add(a, b)).toBe(expected))
})
