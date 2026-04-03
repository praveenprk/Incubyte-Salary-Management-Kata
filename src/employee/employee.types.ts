export interface Employee {
    name: string,
    salary: number,
    jobTitle: string,
    country: string,
}

export type EmployeeRecord = Employee & {
  id: number
}