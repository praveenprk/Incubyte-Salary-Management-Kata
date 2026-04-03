import db from '../db/db'
import { Employee, EmployeeRecord } from './employee.types'

type Metrics = {
  min: number
  max: number
  avg: number
}

const SELECT = `SELECT id, name, salary, job_title as jobTitle, country FROM employees`

export function createEmployee(emp: Employee): EmployeeRecord {
  const stmt = db.prepare(
    `INSERT INTO employees (name, salary, job_title, country)
     VALUES (@name, @salary, @jobTitle, @country)`
  )
  const result = stmt.run(emp)
  return db.prepare(`${SELECT} WHERE id = ?`).get(result.lastInsertRowid) as EmployeeRecord
}

export function updateEmployee(id: number, emp: Employee): EmployeeRecord | null {
  const existing = getEmployeeById(id)
  if (!existing) return null

  db.prepare(
    `UPDATE employees SET name = @name, salary = @salary, job_title = @jobTitle, country = @country
     WHERE id = @id`
  ).run({ ...emp, id })

  return getEmployeeById(id)
}

export function getEmployeeById(id: number): EmployeeRecord | null {
  return db.prepare(`${SELECT} WHERE id = ?`).get(id) as EmployeeRecord || null
}

export function getSalaryMetricsByCountry(country: string): Metrics | null {
  const result = db.prepare(
    `SELECT MIN(salary) as min, MAX(salary) as max, AVG(salary) as avg
     FROM employees WHERE LOWER(country) = LOWER(?)`
  ).get(country) as Metrics | null

  if (!result || result.min === null) return null
  return result
}

export function getAvgSalaryByJobTitle(jobTitle: string): { avg: number } | null {
  return db.prepare(
    `SELECT AVG(salary) as avg
     FROM employees WHERE LOWER(job_title) = LOWER(?)`
  ).get(jobTitle) as { avg: number } || null
}

export function deleteEmployee(id: number): boolean {
  const existing = getEmployeeById(id)
  if (!existing) return false

  db.prepare('DELETE FROM employees WHERE id = ?').run(id)
  return true
}