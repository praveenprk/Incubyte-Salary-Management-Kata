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