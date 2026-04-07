import { Router } from 'express'
import { createEmployee, updateEmployee, deleteEmployee, getAvgSalaryByJobTitle, getEmployeeById, getSalaryMetricsByCountry } from './employee.store'
import { validateEmployee } from './employee.validator'
import { calculateSalary } from './salary.calculator'

const router = Router()

// create new employee
router.post('/', (req, res) => {
  const emp = req.body

  const { valid } = validateEmployee(emp)
  if (!valid) {
    res.status(400).json({ error: 'Invalid employee data' })
    return
  }

  const result = createEmployee(emp)
  res.status(201).json(result)
})

// get metrics by country
router.get('/metrics/country', (req, res) => {
  const country = req.query.country as string
  const metrics = getSalaryMetricsByCountry(country)

  if (!metrics) {
    res.status(404).json({ error: 'No employees found for this country' })
    return
  }

  res.status(200).json({
    min: metrics.min,
    max: metrics.max,
    avg: metrics.avg
  })
})

// get metrics by job title
router.get('/metrics/jobtitle', (req, res) => {
  const jobTitle = req.query.jobTitle as string
  const metrics = getAvgSalaryByJobTitle(jobTitle)

  if (!metrics) {
    res.status(404).json({ error: 'No employees found for this job title' })
    return
  }

  res.status(200).json({
    avg: metrics.avg
  })
})

// get emp by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const employee = getEmployeeById(id)

  if (!employee) {
    res.status(404).json({ error: 'Employee not found' })
    return
  }

  res.status(200).json(employee)
})

// update employee
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const emp = req.body

  const { valid } = validateEmployee(emp)
  if (!valid) {
    res.status(400).json({ error: 'Invalid employee data' })
    return
  }

  const result = updateEmployee(id, emp)
  if (!result) {
    res.status(404).json({ error: 'Employee not found' })
    return
  }

  res.status(200).json(result)
})

// calc salary
router.get('/:id/salary', (req, res) => {
  const id = parseInt(req.params.id)
  const employee = getEmployeeById(id)

  if (!employee) {
    res.status(404).json({ error: 'Employee not found' })
    return
  }

  const { tds, netSalary } = calculateSalary(employee.salary, employee.country)
  res.status(200).json({ tds, netSalary })
})

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const deleted = deleteEmployee(id)

  if (!deleted) {
    res.status(404).json({ error: 'Employee not found' })
    return
  }

  res.status(204).send()
})

export default router