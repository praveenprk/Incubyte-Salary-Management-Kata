import express from 'express'
import employeeRoutes from './employee/employee.routes'

const app = express()
app.use(express.json())
app.use('/employees', employeeRoutes);

export default app