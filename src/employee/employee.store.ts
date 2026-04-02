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

export async function getEmployeeById(id: number) {
  const result = await pool.query(
    'SELECT * FROM employees WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

export async function getSalaryMetricsByCountry(country: string) {
  const result = await pool.query(
    `SELECT MIN(salary) as min, MAX(salary) as max, AVG(salary) as avg
     FROM employees WHERE LOWER(country) = LOWER($1)`,
    [country]
  )
  return result.rows[0]
}

export async function getAvgSalaryByJobTitle(jobTitle: string) {
  const result = await pool.query(
    `SELECT AVG(salary) as avg
     FROM employees WHERE LOWER(job_title) = LOWER($1)`,
    [jobTitle]
  )
  return result.rows[0]
}