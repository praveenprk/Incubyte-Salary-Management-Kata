import { calculateSalary } from './salary.calculator'

describe('Salary calculator', () => {

  it('should deduct 10% TDS for india', () => {
    const result = calculateSalary(100000, 'india')
    expect(result.tds).toBe(10000)
    expect(result.netSalary).toBe(90000)
  })

  it('should deduct 12% TDS for united states', () => {
    const result = calculateSalary(100000, 'united states')
    expect(result.tds).toBe(12000)
    expect(result.netSalary).toBe(88000)
})

})