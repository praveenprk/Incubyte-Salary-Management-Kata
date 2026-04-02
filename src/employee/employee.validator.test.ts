import {validateEmployee} from './employee.validator';
import { Employee } from './employee.types';

describe('employee validation', () => {
    it('should return true for a valid employee', () => {
        const emp: Employee = {
            name: 'pk',
            salary: 150000,
            jobTitle: 'swe',
            country: 'India',
        }

        const result = validateEmployee(emp);

        expect(result.valid).toBe(true);

    })

it('should return false when name is missing', () => {
  const emp: Employee = {
    name: '',
    salary: 150000,
    jobTitle: 'swe',
    country: 'india'
  }

  const result = validateEmployee(emp)

  expect(result.valid).toBe(false)
})

 it('should return false when salary is less than 1', () => {
  const emp: Employee = {
    name: 'pk',
    salary: 0,
    jobTitle: 'swe',
    country: 'india'
  }

  const result = validateEmployee(emp)

  expect(result.valid).toBe(false)
})


it('should return false when job title is missing', () => {
  const emp: Employee = {
    name: 'pk',
    salary: 150000,
    jobTitle: '',
    country: 'india'
  }

  const result = validateEmployee(emp)

  expect(result.valid).toBe(false)
})


it('should return false when country is missing', () => {
  const emp: Employee = {
    name: 'pk',
    salary: 150000,
    jobTitle: 'swe',
    country: ''
  }

  const result = validateEmployee(emp)

  expect(result.valid).toBe(false)
})
})