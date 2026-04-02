// server and app are different beacsue to supertest imports app directly. port is not needed
import app from './app'

app.listen(3000, () => {
  console.log('Server running on port 3000')
})