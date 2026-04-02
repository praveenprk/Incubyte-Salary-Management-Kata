import pool from '../db/db';
import { createEmployee } from './employee.store';
import { Employee } from './employee.types';

describe('Employee store repo', () => {
   afterEach(async () => {
    await pool.query('DELETE FROM employees')
  })

  afterAll(async () => {
    await pool.end()
  })

  it('should insert a valid employee and return it with an id', async () => {

   

    const emp: Employee = {
      name: 'pk',
      salary: 150000,
      jobTitle: 'swe',
      country: 'india'
    }

    const result = await createEmployee(emp)

    expect(result.id).toBeDefined()
    expect(result.name).toBe('pk')
  })

})