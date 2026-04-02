import { Router } from 'express'
import { createEmployee, getAvgSalaryByJobTitle, getEmployeeById, getSalaryMetricsByCountry } from './employee.store'
import { validateEmployee } from './employee.validator'
import { calculateSalary } from './salary.calculator'

const router = Router()

// create new employee
router.post('/', async (req, res) => {
  const emp = req.body

  const { valid } = validateEmployee(emp)
  if (!valid) {
    res.status(400).json({ error: 'Invalid employee data' })
    return
  }

  const result = await createEmployee(emp)
  res.status(201).json(result)
})

// get emp by id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const employee = await getEmployeeById(id)

  if (!employee) {
    res.status(404).json({ error: 'Employee not found' })
    return
  }

  res.status(200).json(employee)
})

// calc salary
router.get('/:id/salary', async (req, res) => {
  const id = parseInt(req.params.id)
  const employee = await getEmployeeById(id)

  if (!employee) {
    res.status(404).json({ error: 'Employee not found' })
    return
  }

  const { tds, netSalary } = calculateSalary(employee.salary, employee.country)
  res.status(200).json({ tds, netSalary })
})

// get metrics by country
router.get('/metrics/country', async (req, res) => {
  const country = req.query.country as string
  const metrics = await getSalaryMetricsByCountry(country)
  res.status(200).json({
    min: parseFloat(metrics.min),
    max: parseFloat(metrics.max),
    avg: parseFloat(metrics.avg)
  })
})

// get metrics by job title
router.get('/metrics/jobtitle', async (req, res) => {
  const jobTitle = req.query.jobTitle as string
  const metrics = await getAvgSalaryByJobTitle(jobTitle)
  res.status(200).json({
    avg: parseFloat(metrics.avg)
  })
})

export default router