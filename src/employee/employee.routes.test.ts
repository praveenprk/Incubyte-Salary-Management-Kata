import request from 'supertest'
import app from '../app'
import db from '../db/db'

describe('POST /employees', () => {

  afterEach(() => {
    db.prepare('DELETE FROM employees').run()
  })


  it('should create an employee and return 201', async () => {
    const emp = {
      name: 'pk',
      salary: 150000,
      jobTitle: 'swe',
      country: 'india'
    }

    const response = await request(app)
      .post('/employees')
      .send(emp)

    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe('pk')
  })

  it('should return 400 when name is missing', async () => {
  const emp = {
    name: '',
    salary: 150000,
    jobTitle: 'swe',
    country: 'india'
  }

  const response = await request(app)
    .post('/employees')
    .send(emp)

  expect(response.status).toBe(400)
})

})


describe('GET /employees/:id', () => {

  afterEach(async () => {
    db.prepare('DELETE FROM employees').run()
  })

  it('should return an employee by id', async () => {
    const created = await request(app)
      .post('/employees')
      .send({ name: 'pk', salary: 150000, jobTitle: 'swe', country: 'india' })

    const response = await request(app)
      .get(`/employees/${created.body.id}`)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('pk')
  })

  it('should return 404 when employee not found', async () => {
    const response = await request(app).get('/employees/99999')

    expect(response.status).toBe(404)
  })

})

describe('GET /employees/:id/salary', () => {

  afterEach(async () => {
    db.prepare('DELETE FROM employees').run()
  })

  it('should deduct 10% TDS for india', async () => {
    const created = await request(app)
      .post('/employees')
      .send({ name: 'pk', salary: 100000, jobTitle: 'swe', country: 'india' })

    const response = await request(app)
      .get(`/employees/${created.body.id}/salary`)

    expect(response.status).toBe(200)
    expect(response.body.tds).toBe(10000)
    expect(response.body.netSalary).toBe(90000)
  })

  it('should deduct 12% TDS for united states', async () => {
    const created = await request(app)
      .post('/employees')
      .send({ name: 'john', salary: 100000, jobTitle: 'swe', country: 'united states' })

    const response = await request(app)
      .get(`/employees/${created.body.id}/salary`)

    expect(response.status).toBe(200)
    expect(response.body.tds).toBe(12000)
    expect(response.body.netSalary).toBe(88000)
  })

  it('should have no deductions for other countries', async () => {
    const created = await request(app)
      .post('/employees')
      .send({ name: 'john', salary: 100000, jobTitle: 'swe', country: 'germany' })

    const response = await request(app)
      .get(`/employees/${created.body.id}/salary`)

    expect(response.status).toBe(200)
    expect(response.body.tds).toBe(0)
    expect(response.body.netSalary).toBe(100000)
  })

})

describe('GET /employees/metrics/country', () => {

  afterEach(async () => {
    db.prepare('DELETE FROM employees').run()
  })

  it('should return min, max and average salary for a country', async () => {
    await request(app).post('/employees').send({ name: 'pk', salary: 100000, jobTitle: 'swe', country: 'india' })
    await request(app).post('/employees').send({ name: 'rk', salary: 200000, jobTitle: 'swe', country: 'india' })
    await request(app).post('/employees').send({ name: 'sk', salary: 300000, jobTitle: 'swe', country: 'india' })

    const response = await request(app)
      .get('/employees/metrics/country?country=india')

    expect(response.status).toBe(200)
    expect(response.body.min).toBe(100000)
    expect(response.body.max).toBe(300000)
    expect(response.body.avg).toBe(200000)
  })

})

describe('GET /employees/metrics/jobtitle', () => {

  afterEach(async () => {
    db.prepare('DELETE FROM employees').run()
  })

  it('should return average salary for a job title', async () => {
    await request(app).post('/employees').send({ name: 'pk', salary: 100000, jobTitle: 'swe', country: 'india' })
    await request(app).post('/employees').send({ name: 'rk', salary: 300000, jobTitle: 'swe', country: 'india' })

    const response = await request(app)
      .get('/employees/metrics/jobtitle?jobTitle=swe')

    expect(response.status).toBe(200)
    expect(response.body.avg).toBe(200000)
  })

})

 afterAll(() => {
    
  })