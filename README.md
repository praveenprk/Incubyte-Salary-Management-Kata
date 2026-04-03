# TDD

TDD is test driven development. 

### What do we test actually, code, function, flow? 
we test behaviour of a certain entity.


- a test must fail first.
- then we write logic to pass that test
- one test at a time

## Why TDD? - To have control
- it forces to think from real world behaviour perspective and actually helps build applications from ground up
- if I write code first and then test, I am testing the function, the return code. But with test first, I test the behaviour. and if it fails, it simply the behaviour doesn't exist.
- It avoids confusion. It keeps devs from wandering around which layer is broken, API, payload, UI, etc. with test, it becomes somewhat easy to point out.
- fast development. Since you write tests around behaviour which doesn't exist yet, you are in CONTROL of your codebase from day 1

### tools used:
- jest to get the main testing utilites
- supertest to test HTTP flows without having to run express server

I first started to think in terms of entities in the emp management.
employees is the first class entity.
so built the test around it.
first basic bare minimum should be, 

employee should be valid. which means it should have name, salary, job title, country.
if any of it is missing or salary is less than 1, invalid employee.
I wrote test for each scenairio and looked that it should fail.


For each failure: I wrote schema, route logic, service logic. until the test passes for the behaviour at hand.

server.ts and app.ts are 2 different files because supertest tests directly with app.

## Implementation Details

### Approach
Built with strict outside-in TDD — behaviour defined before implementation, one layer at a time.

Layer order:
1. Entity validation — pure functions, no infrastructure, fastest feedback loop
2. Store layer — PostgreSQL via node-postgres, no ORM, direct SQL
3. HTTP layer — Express routes, tested end to end with supertest

Every test was written red first. Minimum code written to make it green. Then next test.

### AI Usage
Used Claude (claude.ai) as a pair programming guide throughout the session.

Claude did not generate bulk code. The workflow was:
- Claude explained TDD concepts and asked questions
- I reasoned through the answer and wrote the test
- Claude reviewed and corrected where needed
- I wrote the implementation to make it green

Prompts were conversational — "what should the first test be?", "why should it fail first?" — not "generate me a CRUD API". The goal was understanding, not output.

### Key Design Decisions
- PostgreSQL over SQLite — production databases don't use SQLite
- No ORM — raw SQL keeps the data layer transparent and explicit
- app.ts and server.ts separated — so supertest can import the app without binding a real port
- validateEmployee called inside the route — HTTP layer delegates to the domain layer, not the other way around
- afterEach cleans DB rows, afterAll closes pool — tests are isolated and repeatable

## Start the Project

- Clone this repo `git clone git@github.com:praveenprk/Incubyte-Salary-Management-Kata.git`
- `cd` into the cloned repo
- Run `npm start`