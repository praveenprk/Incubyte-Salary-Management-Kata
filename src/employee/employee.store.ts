import pool from '../db/db'
import { Employee } from './employee.types'

export async function createEmployee(emp: Employee) {
  const { name, salary, jobTitle, country } = emp

  const result = await pool.query(
    `INSERT INTO employees (name, salary, job_title, country)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, salary, jobTitle, country]
  )

  return result.rows[0]
}